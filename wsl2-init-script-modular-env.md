
# 🐧 WSL2 初始化腳本與模組化環境建置指南

本指南提供一套模組化的 WSL2 初始化腳本，支援互動式安裝與擴充，適用於 Ubuntu on WSL2 開發環境快速建構。

---

## 📁 專案結構建議

```
wsl-setup/
├── setup/
│   ├── 00-base.sh          # 安裝中文字型與 locale
│   ├── 01-docker.sh        # 安裝 Docker
│   ├── 02-zsh.sh           # 安裝 Zsh + Oh My Zsh
│   ├── 03-python.sh        # 安裝 Python 3.12
│   ├── 04-nodejs.sh        # 安裝 Node.js LTS
│   ├── 05-thefuck.sh       # 安裝 thefuck
│   └── 06-cli-tools.sh     # 安裝 CLI 工具（fzf, bat, tldr, gh）
├── install.sh              # 主控制腳本（互動選擇模組安裝）
├── README.md
└── .gitignore
```

---

## 🧭 install.sh 範例（主控腳本）

```bash
#!/bin/bash

echo "🚀 歡迎使用 WSL2 初始化模組化安裝工具"
echo "請選擇要安裝的模組（y/n）"

read -p "1️⃣ 安裝基本字型與 locale？(y/n): " INSTALL_BASE
read -p "2️⃣ 安裝 Docker？(y/n): " INSTALL_DOCKER
read -p "3️⃣ 安裝 Zsh + Oh My Zsh？(y/n): " INSTALL_ZSH
read -p "4️⃣ 安裝 Python 3.12？(y/n): " INSTALL_PYTHON
read -p "5️⃣ 安裝 Node.js LTS？(y/n): " INSTALL_NODE
read -p "6️⃣ 安裝 thefuck？(y/n): " INSTALL_FUCK
read -p "7️⃣ 安裝 CLI 工具？(bat/fzf/tldr/gh)? (y/n): " INSTALL_CLI

[[ $INSTALL_BASE == "y" ]] && bash ./00-base.sh
[[ $INSTALL_DOCKER == "y" ]] && bash ./01-docker.sh
[[ $INSTALL_ZSH == "y" ]] && bash ./02-zsh.sh
[[ $INSTALL_PYTHON == "y" ]] && bash ./03-python.sh
[[ $INSTALL_NODE == "y" ]] && bash ./04-nodejs.sh
[[ $INSTALL_FUCK == "y" ]] && bash ./05-thefuck.sh
[[ $INSTALL_CLI == "y" ]] && bash ./06-cli-tools.sh

echo "✅ 所有選定模組安裝完成！"
```

---

## 🔧 模組簡介

### 00-base.sh：基本套件與中文字型

```bash
sudo apt update
sudo apt install -y wget \
  fonts-noto-cjk fonts-wqy-zenhei fonts-wqy-microhei \
  fonts-arphic-ukai fonts-arphic-uming \
  language-pack-zh-hant
sudo update-locale LANG=zh_TW.UTF-8
sudo locale-gen zh_TW zh_TW.UTF-8
source /etc/default/locale
```

---

### 01-docker.sh：Docker 安裝與使用者群組加入

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

---

### 02-zsh.sh：Zsh 與 Oh My Zsh 安裝

```bash
sudo apt install -y zsh git
chsh -s $(which zsh)
export RUNZSH=no
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
sed -i 's/ZSH_THEME=".*"/ZSH_THEME="agnoster"/' ~/.zshrc
```

---

### 03-python.sh：安裝 Python 3.12 + pip

```bash
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3.12-dev
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.12 1
curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3.12
```

---

### 04-nodejs.sh：Node.js LTS 安裝

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

---

### 05-thefuck.sh：安裝 thefuck（命令修正工具）

```bash
sudo apt install -y python3-dev python3-pip
pip3 install --user thefuck
echo 'eval "$(thefuck --alias)"' >> ~/.zshrc
```

---

### 06-cli-tools.sh：安裝常用 CLI 工具

```bash
sudo apt install -y fzf bat tldr

# 安裝 GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
https://cli.github.com/packages stable main" | \
  sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

sudo apt update
sudo apt install -y gh

tldr --update
```

---

## 🚀 使用方式

```bash
git clone https://github.com/yourname/wsl-setup.git
cd wsl-setup/setup
chmod +x *.sh
./install.sh
```

> 安裝完成後請重啟 WSL2 以確保 Docker、Zsh 等設定生效。

---

## 📌 延伸建議

- 模組化可方便日後加入更多如 `poetry`, `nvm`, `kubectl`, `minikube` 等
- 可配合 `.dotfiles` 設定進一步客製化 shell 環境
