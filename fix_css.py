with open("style.css", "rb") as f:
    data = f.read()

text = data.decode("utf-8", errors="ignore")
last_part = text[-3000:]
print(last_part)
