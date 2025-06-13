# YouTube 字幕製作指南

## 📘 字幕格式介紹：SRT

`.srt`（SubRip Subtitle）是最常見的字幕檔案格式，YouTube 支援此格式。

範例：

```
1
00:00:01,000 --> 00:00:03,000
這是第一行字幕

2
00:00:04,000 --> 00:00:06,000
這是第二行字幕
```

每段字幕包含：
- 序號
- 時間軸（開始時間 --> 結束時間）
- 字幕內容
- 段落之間需空一行

---

## 🛠 製作字幕的三種方法

### 方法一：手動撰寫 `.srt` 字幕

1. 使用文字編輯器（如 VS Code、Notepad）
2. 依 `.srt` 格式撰寫字幕與時間
3. 儲存為 `.srt` 檔案，編碼選擇 **UTF-8**

---

### 方法二：使用 Whisper AI 自動產出字幕

#### 安裝 Whisper
```bash
pip install openai-whisper
```

#### 執行程式
```python
import whisper

model = whisper.load_model("large")
result = model.transcribe("your_audio.mp3", verbose=True)
with open("output.srt", "w", encoding="utf-8") as f:
    f.write(result["srt"])
```

Whisper 會自動將語音辨識結果輸出為 `.srt` 字幕檔。

---

### 方法三：使用線上工具

推薦平台：
- [Amara](https://amara.org/)
- [Kapwing](https://www.kapwing.com/)
- [Subtitle Edit Online](https://www.nikse.dk/subtitleedit/online)

適合不會寫程式但想快速製作或編輯字幕的使用者。

---

## ⬆️ 上傳字幕至 YouTube

1. 登入 YouTube Studio
2. 選擇【內容】→ 選擇影片
3. 點【字幕】→【新增語言】→【新增檔案】
4. 選擇「有時間碼的字幕檔」→ 上傳 `.srt`
5. 儲存即可完成上傳

---

## 🔍 字幕製作注意事項

| 項目 | 建議 |
|------|------|
| 時間格式 | 使用 `hh:mm:ss,ms`（逗號作為毫秒分隔） |
| 每行長度 | 建議每行不超過 35 字 |
| 顯示時間 | 每段字幕建議顯示 1～6 秒 |
| 編碼格式 | 儲存為 UTF-8，以避免中文字亂碼問題 |

---

## 📂 延伸格式與需求

- 若需產出 `.vtt` 或 `.ass` 字幕格式，可再另外轉換
- 若需字幕翻譯、多語版本、語者分離，也可配合 AI 工具實現

---

> 📌 建議先確認是否要手動編輯字幕、還是使用 AI 自動產出，以決定最佳工作流程。
```
