# LangChain 與 Model Context Protocol（MCP）差異比較

## 一、基本定義與背景

| 項目 | LangChain | Model Context Protocol (MCP) |
|------|-----------|------------------------------|
| 定義 | 一個開源框架，用來建構以 LLM 為核心的應用，提供模組如記憶體、代理人、RAG 等 | 一種由 Anthropic 提出的標準協定，定義如何將模型上下文管理結構化處理 |
| 發展主體 | LangChain 團隊，社群驅動 | Anthropic（Claude 模型開發商） |
| 發表時間 | 2022 年起活躍 | 2024 年發表（初步草案） |
| 本質 | 開發框架 / SDK | 模型輸入設計標準（Protocol） |

---

## 二、功能與用途比較

| 功能 | LangChain | MCP |
|------|-----------|-----|
| 開發工具 | ✅ 可直接使用（Python/TS） | ❌ 為協定，需自行實作 |
| 記憶體管理 | ✅ 提供 Memory 模組 | ✅ 規範 context 記憶格式 |
| 檢索強化生成（RAG） | ✅ 有內建整合 | ✅ 可定義 retrieved_context 區塊 |
| 多輪對話支援 | ✅ ConversationChain | ✅ 使用 conversation_history 區段 |
| Agent 與工具鏈 | ✅ Agent + Tools 支援 | ❌ MCP 不處理 Agent |
| Prompt 管理 | ✅ 由程式控制 | ✅ 結構化區段式設計（JSON 或類似格式） |

---

## 三、設計哲學與思維差異

| 思維層次 | LangChain | MCP |
|----------|-----------|-----|
| 模型角色 | 可組合的工具 | 上下文理解器 |
| 開發導向 | 工程導向：模組組裝 | 語意導向：上下文一致性 |
| Prompt 架構 | 程式邏輯控制 | 分段結構、語意標註 |
| 適合場景 | 開發 SaaS、RAG 工具、Agent系統 | 長上下文、多模態輸入、Claude最佳化應用 |

---

## 四、MCP 設計區段範例

MCP 的上下文分為以下幾個區段：

- `user_file`：用戶上傳的原始資料
- `conversation_history`：歷史對話記錄
- `instructions`：目前任務目標
- `retrieved_context`：來自檢索引擎的內容
- `tool_results`：外部工具查詢結果（如網頁、API）
- `scratchpad`：代理人思考過程、暫存中繼推理

這些可以組成如以下 JSON 構造，作為模型 input：

```json
{
  "conversation_history": [...],
  "instructions": "...",
  "retrieved_context": [...],
  "tool_results": [...],
  "scratchpad": "..."
}
```

---

## 五、使用建議與選擇時機

| 使用情境 | 建議採用 |
|----------|-----------|
| 快速開發原型、整合向量資料庫 | ✅ LangChain |
| Claude 專案需穩定長上下文輸出 | ✅ MCP |
| 建構高彈性 AI 工具平台 | ✅ LangChain |
| 設計 prompt 標準、團隊多人協作 | ✅ MCP |
| 搭配 GPT-4 多模態應用 | ⚠️ MCP 還在發展中，可做為原則參考 |

---

## 六、可搭配使用的方式

MCP 與 LangChain 並非互斥，可搭配使用：
- 用 MCP 設計 prompt 格式 → 傳入 LangChain agent chain 中
- 由 LangChain 控制流程 → 保持 prompt 結構符合 MCP 協定
- 建立跨模型、跨語言一致輸入格式，提升上下文穩定性與輸出品質

---

## 七、延伸任務建議

你可以進一步做的事情包括：

1. ✅ 建立一個符合 MCP 協定的 prompt wrapper（適用 GPT / Claude）
2. ✅ 撰寫 LangChain 元件封裝 MCP prompt 建構器
3. ✅ 整合 Claude RAG with MCP 格式：`retrieved_context` → JSON格式 + metadata
4. ✅ 設計 prompt 訓練手冊：標準化 input 格式與語意欄位

---

> 📂 本文為知識庫條目：「LangChain 與 MCP 差異解析」
> 更新時間：2025-04  
> 建議分類：`AI Framework`、`Prompt Engineering`、`Multimodal LLM`
