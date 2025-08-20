from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# SE precisar, adicione o caminho do seu chromedriver explicitamente assim:
# driver = webdriver.Chrome(executable_path="C:\\chromedriver\\chromedriver.exe")
# Caso contrário, se estiver no PATH:
options = Options()
options.add_argument(r"user-data-dir=C:\Users\SEU_USUARIO\AppData\Local\Google\Chrome\User Data")
options.add_argument("profile-directory=Default")
options.add_experimental_option("excludeSwitches", ["enable-logging"])
driver = webdriver.Chrome()

# Abre o Google
driver.get("https://web.whatsapp.com/")
print("Navegador abriu o Google!")

# Espera o campo de busca aparecer
time.sleep(2)  # opcional, só pra dar tempo visual

# Encontra a caixa de pesquisa e digita
caixa_busca = driver.find_element(By.NAME, "q")
caixa_busca.send_keys("teste selenium")
caixa_busca.send_keys(Keys.RETURN)

print("Fez a pesquisa no Google!")

# Espera alguns segundos para você ver
time.sleep(5)

# Fecha o navegador
driver.quit()
print("Teste concluído e navegador fechado.")
