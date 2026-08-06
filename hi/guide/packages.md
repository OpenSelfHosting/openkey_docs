# पैकेज

पैकेज जिन्हें आप self-host और build कर सकते हैं। **OpenKey मोबाइल/डेस्कटॉप ऐप** [ऐप का उपयोग](./app) में कवर है।

| पथ | विवरण |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | FastAPI zero-knowledge sync API + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | MV3 ब्राउज़र एक्सटेंशन (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | डेवलपर CLI — सीक्रेट, पासवर्ड जेनरेशन, sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | यह साइट — उत्पाद पृष्ठ और दस्तावेज़ |

 क्लाइंट के दैनिक उपयोग के लिए [ऐप का उपयोग](./app) देखें।

## सर्वर हाइलाइट

- केवल ciphertext स्टोरेज
- JWT access tokens + घूर्णित opaque refresh tokens
- PostgreSQL 16 पर Alembic migrations
- auth rate limiting और strict CORS

## एक्सटेंशन हाइलाइट

- standalone vault unlock + sync, या अनलॉक डेस्कटॉप ऐप से native bridge
- Autofill overlays, save/update prompts, passkeys
- कार्ड, क्रिप्टो वॉलेट और डेवलपर सीक्रेट

## CLI हाइलाइट

- offline पासवर्ड जेनरेशन
- अनलॉक डेस्कटॉप ऐप में SSH keys, `.env` files और API tokens खोजें
- आपके सर्वर के विरुद्ध वैकल्पिक login / unlock / sync

[OpenSelfHosting](https://github.com/OpenSelfHosting) के तहत प्रकाशित remotes अलग पैकेज भेज सकते हैं; यह docs साइट उपरोक्त ओपन पैकेज वर्णन करती है।
