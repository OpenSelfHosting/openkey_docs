---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Самостоятельно размещаемый менеджер паролей. На сервере только шифротекст."
  cta-primary="Скачать"
  cta-secondary="Начать"
  download-link="/ru/guide/download"
  quick-start-link="/ru/guide/quick-start"
/>

<HomeSections
  features-title="Почему OpenKey"
  :features="[
    { title: 'Только шифротекст', body: 'Argon2id на устройстве. Сервер никогда не видит мастер-пароль или ключ сейфа.', href: '/ru/guide/security', linkLabel: 'Модель безопасности' },
    { title: 'Самохостинг или Nearby', body: 'Синхронизация через Docker API — или сопряжение устройств в LAN по QR без сервера.', href: '/ru/guide/nearby', linkLabel: 'Гайд Nearby' },
    { title: 'Автозаполнение и passkeys', body: 'Системное автозаполнение плюс расширение браузера с горячей клавишей и WebAuthn.', href: '/ru/guide/extension', linkLabel: 'Расширение браузера' },
    { title: 'Команды тоже zero-knowledge', body: 'Организации и общий доступ шифруются ключами, которые сервер не может развернуть.', href: '/ru/guide/sharing', linkLabel: 'Общий доступ и орг.' }
  ]"
  platforms-title="Где вы работаете"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Docker-сервер', 'CLI']"
  how-title="Как синхронизация остаётся zero-knowledge"
  :how-steps="['Получите ключи из email + мастер-пароля через Argon2id', 'Отправляйте только auth hash для входа', 'Шифруйте имена, записи и вложения до загрузки', 'Сервер хранит непрозрачный шифротекст — никогда ключ сейфа']"
  cta-title="Начните на своей инфраструктуре"
  cta-body="Скачайте приложение, укажите сервер или спарьте Nearby для синхронизации только по LAN."
  cta-primary="Скачать"
  cta-secondary="Начать"
  cta-security="Модель угроз"
  download-link="/ru/guide/download"
  quick-start-link="/ru/guide/quick-start"
  security-link="/ru/guide/security"
/>

</div>
