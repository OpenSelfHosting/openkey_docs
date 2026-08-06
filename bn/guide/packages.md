# প্যাকেজ

আপনি নিজে হোস্ট ও বিল্ড করতে পারেন এমন প্যাকেজ। **OpenKey মোবাইল/ডেস্কটপ অ্যাপ** [অ্যাপ ব্যবহার](./app)-এ বর্ণিত।

| পাথ | বিবরণ |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | FastAPI zero-knowledge সিঙ্ক API + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | MV3 ব্রাউজার এক্সটেনশন (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | ডেভেলপার CLI — সিক্রেট, পাসওয়ার্ড জেনারেশন, সিঙ্ক |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | এই সাইট — পণ্য পৃষ্ঠা ও ডকুমেন্টেশন |

 ক্লায়েন্টের দৈনন্দিন ব্যবহারের জন্য [অ্যাপ ব্যবহার](./app) দেখুন।

## সার্ভার হাইলাইট

- শুধু ciphertext স্টোরেজ
- JWT অ্যাক্সেস টোকেন + ঘূর্ণায়মান opaque refresh টোকেন
- PostgreSQL 16-এ Alembic মাইগ্রেশন
- auth rate limiting ও strict CORS

## এক্সটেনশন হাইলাইট

- standalone ভল্ট আনলক + সিঙ্ক, অথবা আনলক করা ডেস্কটপ অ্যাপে native bridge
- Autofill overlay, save/update প্রম্পট, passkeys
- কার্ড, ক্রিপ্টো ওয়ালেট ও ডেভেলপার সিক্রেট

## CLI হাইলাইট

- অফলাইন পাসওয়ার্ড জেনারেশন
- আনলক করা ডেস্কটপ অ্যাপে SSH কী, `.env` ফাইল ও API টোকেন আবিষ্কার
- আপনার সার্ভারের বিপরীতে ঐচ্ছিক login / unlock / sync

[OpenSelfHosting](https://github.com/OpenSelfHosting)-এর অধীনে প্রকাশিত remotes আলাদা প্যাকেজ পাঠাতে পারে; এই ডক্স সাইট উপরের ওপেন প্যাকেজ বর্ণনা করে।
