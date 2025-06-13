# Discord Bot 建立與權限設定教學

這份文件將手把手教你如何建立一個 Discord Bot，並授予正確的權限來讀取訊息、接收指令、回覆訊息，適用於 Python + discord.py 架構。

---

## 🔧 建立 Discord Bot 應用程式

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點選右上角 **New Application**
3. 輸入你的應用程式名稱（例如：LunchBot）
4. 點進應用程式後左側選單選擇 **Bot** → 點選 **Add Bot**
5. 記下你的 Bot Token（稍後在程式中使用）

---

## 🔑 啟用 Bot 權限與 Intents

進入應用程式 → Bot 分頁，設定以下內容：

### ✅ 開啟 Privileged Intents：
- [x] Message Content Intent（讀取訊息內容）
- [x] Server Members Intent（如需記錄加入者可勾選）

### ✅ 選擇 Bot 權限：
以下是常見的 Bot 權限設定建議：

| 權限                     | 說明                      |
|--------------------------|---------------------------|
| Read Messages/View Channels | 可以讀取頻道內容（必要）       |
| Send Messages            | 傳送訊息                   |
| Manage Messages (選擇性)   | 可刪除訊息、編輯                |
| Embed Links              | 嵌入式訊息卡片（美化訊息）     |
| Attach Files             | 傳送圖片或檔案               |

---

## 🔗 產生 Bot 邀請連結

1. 進入左側選單的 **OAuth2 → URL Generator**
2. 選取：
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions：選取上述權限
3. 複製下方產生的邀請連結，貼到瀏覽器打開，即可將 Bot 加入伺服器

---

## 🐍 安裝 Python 套件與建立專案

```bash
pip install -U discord.py
```

建立你的 `bot.py`：

```python
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True  # 必須打開才能讀取訊息內容

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ Bot 已上線：{bot.user}")

@bot.command()
async def hello(ctx):
    await ctx.send(f"哈囉，{ctx.author.mention}！")

bot.run("你的 BOT TOKEN")
```

---

## 🚀 啟動與測試

1. 使用命令 `python bot.py` 啟動 Bot
2. 在你邀請 Bot 加入的伺服器輸入：
   ```
   !hello
   ```
   Bot 應該會回傳 `哈囉 @你`

---

## ⚠️ 常見錯誤排查

### ❌ `PrivilegedIntentsRequired`
- 請回到 Bot 設定頁面勾選 **Message Content Intent**

### ❌ Slash Command 沒有出現？
- 加上 `await bot.tree.sync()` 到 `on_ready()` 中
- 或確認有加入 `applications.commands` scope

---

## ✅ 延伸建議

- 使用 `@bot.tree.command()` 寫 Slash Command
- 使用 `cogs` 拆分功能模組
- 實作 `/summarize`、訊息記錄、自動摘要等擴充功能

---

如需進階設計、訊息自動摘要、自定化行為等功能，請延續目前架構開發，或參考本專案其他文件。
