from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument(r"user-data-dir=C:\Users\SEU_USUARIO\AppData\Local\Google\Chrome\User Data")
options.add_argument("profile-directory=Default")
options.add_experimental_option("excludeSwitches", ["enable-logging"])

driver = webdriver.Chrome(options=options)
driver.get("https://web.whatsapp.com")

# Aguarda você ver os chats carregados
input("Pressione ENTER quando o WhatsApp estiver pronto...")
