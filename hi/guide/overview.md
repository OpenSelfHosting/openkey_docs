# अवलोकन

OpenKey एक **self-hosted, end-to-end encrypted पासवर्ड मैनेजर** है। क्लाइंट vault डेटा को डिवाइस छोड़ने से पहले एन्क्रिप्ट करते हैं। वैकल्पिक sync सर्वर **केवल ciphertext** संग्रहीत करता है — मास्टर पासवर्ड और plaintext vault keys कभी क्लाइंट नहीं छोड़ते।

## आपको क्या मिलता है

- स्थानीय एन्क्रिप्टेड vault (collections, logins, cards, crypto wallets, developer secrets)
- अपने सर्वर के माध्यम से डिवाइसों में वैकल्पिक sync
- autofill और passkeys के साथ ब्राउज़र एक्सटेंशन
- मोबाइल / डेस्कटॉप ऐप और ओपन developer CLI
- organizations, shared collections और item shares — सर्वर पर अभी भी ciphertext

## Zero-knowledge मॉडल

1. क्लाइंट **Argon2id** से मास्टर पासवर्ड से keys derive करता है।
2. `auth_hash` मास्टर पासवर्ड प्रकट किए बिना सर्वर पर authenticate करता है।
3. vault contents vault key से एन्क्रिप्टेड रहते हैं जिसे सर्वर plaintext में नहीं देखता।
4. names, payloads, attachments, org names और share payloads सर्वर पर opaque ciphertext।

## ओपन पैकेज

| पैकेज | भूमिका |
|---------|------|
| `openkey_server` | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MV3 ब्राउज़र एक्सटेंशन (Chrome / Firefox) |
| `openkey_cli` | Developer CLI (secrets, password gen, sync) |

मोबाइल और डेस्कटॉप **OpenKey ऐप** अलग से कवर है। उत्पाद उपयोग के लिए [ऐप का उपयोग](./app), setup के लिए [पैकेज](./packages), sync इंस्टॉल के लिए [सर्वर सेटअप](./server), और स्थानीय रूप से stack चलाने के लिए [Quick start](./quick-start) देखें।
