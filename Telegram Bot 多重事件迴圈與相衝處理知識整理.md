# Telegram Bot 多重事件迴圈與相衝處理知識整理

## 🎯 主題說明

本筆記整理當在一個開發環境（例如 PyCharm、Jupyter、Python ≥ 3.13）中，**同時執行多個 Telegram Bot** 時，可能會發生的 `asyncio` 事件迴圈衝突與解法。

---

## ⚠️ 常見錯誤訊息

```text
RuntimeError: This event loop is already running
RuntimeError: Cannot close a running event loop
RuntimeWarning: coroutine 'Application.shutdown' was never awaited
```

這些錯誤表示事件迴圈已經被 IDE 啟動，再次使用 `asyncio.run()` 會造成衝突。

---

## ✅ 問題根源

| 情況 | 結果 |
|------|------|
| 一隻 bot 已經執行中 | 建立了一個事件迴圈 |
| 第二隻 bot 也呼叫 `asyncio.run(...)` | 嘗試建立新 loop → 錯誤 |
| PyCharm/Jupyter 內建事件迴圈 | 無法被關閉或覆寫 |
| `run_polling()` 內部嘗試 close loop | 在既有 loop 中失敗 |

---

## ✅ 解法一：使用 `nest_asyncio`（適用 PyCharm / Notebook）

```bash
pip install nest_asyncio
```

```python
import nest_asyncio
nest_asyncio.apply()

import asyncio
asyncio.run(main())
```

這能讓已有的事件迴圈支援再次 `await` 新的 coroutine。

---

## ✅ 解法二：多隻 bot 改為分開執行

**最安全方式**是讓每一隻 bot 獨立在一個 `.py` 腳本執行：

```bash
# 終端開多視窗或用 systemd / tmux / supervisord
python bot1.py
python bot2.py
```

每個 bot 各自獨立事件迴圈，不會衝突。

---

## ✅ 解法三：集中式 async 管理（進階）

如果需要在一個進程中跑多隻 bot，可以用 `asyncio.gather()`：

```python
await asyncio.gather(
    app1.run_polling(),
    app2.run_polling()
)
```

這需要你分別建立多個 `ApplicationBuilder().token(...)` 實體。

---

## 🧠 補充：不要使用錯誤結構

錯誤的做法（會造成事件迴圈錯誤）：

```python
await app.updater.idle()  # ❌ 已棄用
```

新版應直接使用：

```python
await app.run_polling()  # ✅ 自動處理啟動、idle 等
```

---

## 🏁 建議標準寫法範例（支援多平台）

```python
import nest_asyncio
nest_asyncio.apply()

import asyncio
import platform

if platform.system() == "Windows":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def main():
    await app.run_polling()

if __name__ == '__main__':
    asyncio.run(main())
```

---
