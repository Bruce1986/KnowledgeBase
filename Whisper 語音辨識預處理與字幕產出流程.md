
# Whisper 語音辨識預處理與字幕產出流程（含 GPU 加速與語者分離預備）

## 🧩 目的
處理大量 MP3 錄音檔，進行語音轉文字，並產出帶時間軸字幕（VTT/SRT），未來支援語者分離。

---

## 🎯 目標功能

- 支援處理大量 MP3（單檔最大 500MB，總量約 1TB）
- 自動濾除無聲片段（靜音段）
- 使用 Whisper Large 模型進行語音辨識（GPU 加速）
- 輸出帶時間軸字幕（WebVTT 格式）
- 為後續語者分離（speaker diarization）預留整合空間

---

## 🔧 技術工具選擇

| 功能項目       | 工具/框架               | 備註                                   |
|----------------|--------------------------|----------------------------------------|
| 音訊轉換       | `ffmpeg`, `pydub`         | MP3 轉 mono/16kHz WAV                 |
| 靜音濾除       | `webrtcvad`（未實作）    | 避免處理無語音區段                     |
| 語音辨識       | `faster-whisper`          | GPU 加速、支援 VAD、float16 精度     |
| 語者分離       | `pyannote-audio`（待整合）| 可標記 speaker_1, speaker_2...        |
| 字幕輸出格式   | `.vtt`, `.srt`, `.json`   | 可選輸出格式，適應不同平台             |

---

## 🧪 基本 Python 腳本（處理單一檔案並輸出 VTT）

```python
from pydub import AudioSegment
from faster_whisper import WhisperModel

def convert_mp3_to_wav(mp3_path, wav_path):
    audio = AudioSegment.from_mp3(mp3_path)
    audio = audio.set_channels(1).set_frame_rate(16000)
    audio.export(wav_path, format="wav")

def format_ts(seconds):
    h, m, s = int(seconds // 3600), int((seconds % 3600) // 60), int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02}:{m:02}:{s:02}.{ms:03}"

def transcribe_to_vtt(model, wav_path, vtt_path):
    segments, _ = model.transcribe(
        wav_path,
        language="zh",
        vad_filter=True,
        vad_parameters={"min_speech_duration_ms": 300}
    )
    with open(vtt_path, "w", encoding="utf-8") as f:
        f.write("WEBVTT\n\n")
        for i, seg in enumerate(segments, 1):
            f.write(f"{i}\n{format_ts(seg.start)} --> {format_ts(seg.end)}\n{seg.text.strip()}\n\n")

# 使用示例
model = WhisperModel("large-v3", device="cuda", compute_type="float16")
convert_mp3_to_wav("input.mp3", "temp.wav")
transcribe_to_vtt(model, "temp.wav", "output.vtt")
```

---

## 📁 WebVTT 格式說明

```vtt
WEBVTT

1
00:00:00.000 --> 00:00:02.500
大家好，我是今天的主持人。

2
00:00:02.500 --> 00:00:05.000
那我們就開始吧。
```

- 支援 YouTube、HTML5 video `<track>` 標籤等
- 與 `.srt` 類似，但支援更多 HTML 語法（粗體、斜體、顏色）

---

## 🛠️ 安裝套件

```bash
pip install faster-whisper pydub
```

> 需另外安裝並設定好 `ffmpeg`，加入 PATH。

---

## 🧱 待開發模組（下一步）

- [ ] 支援整個資料夾批次處理
- [ ] 整合 `webrtcvad` 音訊切段 + 雜訊過濾
- [ ] 整合 `pyannote-audio` 做語者分離
- [ ] 匯出多種格式（JSON / SRT / 分段 .txt）

---

## 📌 附註

- 模型版本建議使用 `large-v3`（支援中文）
- Whisper GPU 建議使用 `float16`，如：4070 Ti Super 可順跑
- Whisper 對靜音容忍度低，過長靜音會導致誤判或低效率

---
