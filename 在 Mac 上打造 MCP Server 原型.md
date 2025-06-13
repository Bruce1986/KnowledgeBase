
# 在 Mac 上打造 MCP Server 原型

## 🎯 目標
建立一個可於 macOS 上本地執行的 MCP（Model Context Protocol）Server，作為開發與測試用的原型，支援語言模型整合、上下文管理與簡單的 REST API。

---

## 🧰 系統需求

- **作業系統**：macOS（Intel 或 Apple Silicon）
- **開發語言**：Python 3.9+
- **建議工具**：
  - `brew`（macOS 套件管理工具）
  - `pyenv` 或 `venv`（Python 環境管理）
  - `FastAPI` + `Uvicorn`（Web Server）
  - `OpenAI` 或本地 LLM（如 Ollama）

---

## 📦 預設專案結構

```plaintext
mcp-server/
├── main.py               # FastAPI 入口
├── mcp/
│   ├── context.py        # 上下文記憶模組（記憶體 / JSON）
│   ├── models.py         # 請求與回應模型
│   ├── router.py         # REST API 路由
│   └── llm.py            # 呼叫 LLM 的邏輯
├── .env                  # API 金鑰與設定
├── requirements.txt      # 套件需求
└── README.md
```

---

## 🔧 安裝與啟動步驟

### 1. 建立 Python 虛擬環境
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. 安裝相依套件
```bash
pip install -r requirements.txt
```

### 3. 建立 `.env` 檔案
```dotenv
OPENAI_API_KEY=你的 API 金鑰
MODEL_NAME=gpt-4
```

### 4. 啟動 Server
```bash
uvicorn main:app --reload
```

---

## 📡 呼叫 API 範例

```bash
curl -X POST http://localhost:8000/mcp/message \
     -H "Content-Type: application/json" \
     -d '{
       "session_id": "user123",
       "message": "今天天氣怎樣？"
     }'
```

---

## 🧠 可擴充功能建議

- ✅ 記憶功能：上下文存入 JSON 或 SQLite
- ✅ 模型選擇：OpenAI、Ollama、本地 LLM
- ✅ 多 Agent 路由：可支援不同專長模型
- ✅ WebSocket：支援串流回答
- ✅ Docker：便於日後部署給團隊或雲端運行

---

## 🧪 開發建議

| 功能              | 工具 / 技術                   |
|-------------------|-------------------------------|
| REST API 框架     | FastAPI + Uvicorn             |
| LLM 呼叫          | OpenAI API 或 Ollama CLI      |
| 上下文管理        | session_id → JSON 儲存        |
| 本地測試          | curl / Postman / Insomnia     |
| 擴充記憶體         | 16GB 以上為佳                  |

---

## 🧩 補充思考

> 「你希望這個 MCP Server 是開給誰用？」  
這會影響是否需要 TLS 加密、API Gateway、使用者驗證或 OAuth 串接等。

目前的假設是：
- ✅ 僅限自己本地開發使用
- ✅ 不對外公開
- ✅ 不需 TLS 或 HTTPS（可簡化啟動流程）

---

## 🔍 下一步可探索

- [ ] 增加日誌紀錄與例外處理
- [ ] 以 SQLite 替代 JSON 儲存上下文
- [ ] 多人協作 API 使用記錄與追蹤

---

如需我直接建立此 MCP Server 的程式原型（含 main.py 與各模組），只要你確定是否：

1. **使用 OpenAI GPT-4 還是先用本地 Ollama？**
2. **上下文存放要用 JSON 還是 SQLite？**
3. **是否要準備 Docker 化支援？**
