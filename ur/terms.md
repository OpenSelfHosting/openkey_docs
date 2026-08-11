# سروس کی شرائط

**آخری تازہ کاری:** 6 August 2026  
**پروڈکٹ:** OpenKey (`com.openselfhosting.openkey`)  
**ناشر:** OpenSelfHosting  
**رابطہ:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)

یہ سروس کی شرائط («شرائط») OpenSelfHosting کے شائع کردہ **OpenKey** ایپلیکیشن اور متعلقہ سرکاری پیکجز کے استعمال کو govern کرتی ہیں۔ OpenKey ڈاؤن لوڈ، انسٹال یا استعمال کر کے آپ ان شرائط سے متفق ہیں۔

متعلقہ: [رازداری کی پالیسی](/ur/privacy) · [سیکیورٹی](/ur/guide/security)

## 1. سروس

OpenKey ایک پاس ورڈ مینیجر ہے جو vault ڈیٹا آپ کے device پر encrypt کرتا ہے۔ اختیاری sync API **صرف ciphertext** ذخیرہ کرتا ہے جب آپ ایپ کو اپنے کنٹرول والے سرور (یا کوئی اور آپ کے لیے چلاتا ہو) کی طرف point کریں۔ OpenSelfHosting دستاویزات میں بیان کردہ مفت بنیادی تجربے کا حصہ لازمی hosted vault cloud فراہم نہیں کرتا۔

اوپن پیکجز (سرور، ایکسٹینشن، CLI، docs) عام طور پر اپنے repositories میں شائع **MIT License** کے تحت دستیاب ہیں۔ موبائل/ڈیسک ٹاپ ایپ ان شرائط کے علاوہ اسٹور کی شرائط کے تحت بھی تقسیم ہو سکتی ہے۔

## 2. اہلیت

آپ کو اپنے دائرہ اختیار میں پابند معاہدہ کرنے کی صلاحیت ہونی چاہیے اور جہاں OpenKey انسٹال کریں وہاں app-store accounts کی کم از کم عمر پوری کرنی چاہیے (اور کم از کم 13، یا مقامی طور پر زیادہ اگر درکار ہو)۔

## 3. آپ کا اکاؤنٹ اور ماسٹر پاس ورڈ

- آپ **ماسٹر پاس ورڈ** سے اپنا vault بناتے اور کنٹرول کرتے ہیں۔
- **ماسٹر پاس ورڈ کی recovery نہیں۔** اگر بھول جائیں اور unlockable device session یا encrypted backup نہ ہو جسے کھول سکیں تو آپ کا ciphertext ناقابلِ بحالی ہے — design کے مطابق۔
- آپ مضبوط ماسٹر پاس ورڈ منتخب کرنے، ضروری backups رکھنے، اور vault unlock رہتے ہوئے devices محفوظ رکھنے کے ذمہ دار ہیں۔

## 4. قابلِ قبول استعمال

آپ متفق ہیں کہ نہیں کریں گے:

- OpenKey قانون یا دوسروں کے حقوق کی خلاف ورزی کے لیے
- OpenSelfHosting infrastructure، دوسرے users کے vaults، یا غیر مجاز systems کو نقصان پہنچانے کی کوشش (سوائے نجی security research جو ہماری [سیکیورٹی پالیسی](/ur/guide/security) کے مطابق رپورٹ ہو)
- Pro purchase status غلط ظاہر کرنا یا store refund/attestation mechanisms کا غلط استعمال
- Apple، Google یا Microsoft معاہدوں کی خلاف ورزی میں proprietary store builds دوبارہ تقسیم کرنا

آپ جو self-hosted servers چلاتے ہیں انہیں آپ محفوظ کریں (HTTPS، secrets، access control)۔ غلط configuration آپ کی ذمہ داری ہے۔

## 5. OpenKey Pro اور خریداری

کچھ فیچرز کے لیے **OpenKey Pro** درکار ہے (مثلاً مفت حدوں سے زیادہ unlimited items، export، encrypted `.okbak` backups، Nearby LAN sync، organizations/sharing، attachments)۔ دیکھیں [ایپ کا استعمال](/ur/guide/app#مفت-بمقابلہ-openkey-pro)۔

- Store purchases اور subscriptions platform (Apple / Google / Microsoft) بل کرتا ہے۔ ان کے refund اور cancellation rules لاگو ہوتے ہیں۔
- کچھ desktop platforms پر Nearby کے ذریعے شیئر شدہ **LAN Pro** peer attestation سہولت ہے، IAP platforms پر store purchase کا متبادل نہیں۔
- قیمتیں اور feature availability بدل سکتی ہیں؛ اہم product changes documentation یا store listings میں ظاہر کریں گے۔

Web builds mobile/desktop builds جیسے Pro enforce نہیں کر سکتے؛ licensing کے لیے web behaviour پر بھروسہ نہ کریں۔

## 6. Third-party services

OpenKey ان کے ساتھ تعامل کر سکتا ہے:

- Operating system Autofill / passkey APIs
- آپ کا self-hosted sync server
- اختیاری Have I Been Pwned range API (صرف prefix)
- App store billing APIs
- آپ کے جوڑے ہوئے Nearby peers

ان services کی اپنی شرائط ہیں۔ ہم third-party outages یا policies کے ذمہ دار نہیں۔

## 7. Intellectual property

OpenKey names، logos اور branding OpenSelfHosting یا اس کے licensors کی ملکیت ہیں۔ Open-source components اپنی respective licenses کے تحت رہتے ہیں۔ آپ کو distributed ایپ استعمال کرنے کا personal، non-exclusive license ملتا ہے — OpenSelfHosting trademarks کی ملکیت نہیں۔

## 8. رازداری

ہماری [رازداری کی پالیسی](/ur/privacy) بتاتی ہے کہ device پر کیا process ہوتا ہے، اختیاری sync آپ کے سرور کو کیا بھیجتا ہے، اور ہم سے کیسے رابطہ کریں۔

## 9. Warranties کی دستبرداری

OpenKey قانون کی زیادہ سے زیادہ حد تک **«جیسا ہے»** اور **«جیسا دستیاب ہے»** فراہم کیا جاتا ہے۔ ہم merchantability، particular purpose کی fitness، اور non-infringement warranties سے دستبردار ہیں۔ ہم warrant نہیں کرتے کہ ایپ uninterrupted، error-free ہوگی، یا ciphertext آپ کے ماسٹر پاس ورڈ اور backups کے بغیر recoverable ہوگا۔

## 10. Liability کی حد

قانون کی زیادہ سے زیادہ حد تک OpenSelfHosting اور contributors indirect، incidental، special، consequential، یا punitive damages، یا profits، data، یا goodwill کے نقصان کے ذمہ دار نہیں — بشمول forgotten master password یا missing backups کی وجہ سے vault access کا نقصان۔

جہاں liability exclude نہ ہو سکے، وہ (a) claim سے پہلے تین مہینوں میں OpenKey Pro کے لیے آپ کی ادائیگی (platforms کے پاس رہنے والے store fees کے علاوہ) یا (b) پچاس امریکی ڈالر (USD $50) میں سے زیادہ تک محدود ہے، جہاں ممنوع نہ ہو۔

## 11. Indemnity

آپ OpenSelfHosting کا دفاع اور indemnification کریں گے claims سے جو آپ کے OpenKey کے غلط استعمال، self-hosted deployments، یا آپ کے ذخیرہ کردہ content سے پیدا ہوں، قانون کی اجازت کے مطابق۔

## 12. Termination

آپ کسی بھی وقت OpenKey استعمال بند کر سکتے ہیں (uninstall، local data delete، store subscriptions cancel)۔ ہم builds تقسیم بند یا features بدل سکتے ہیں۔ جو provisions nature کے مطابق باقی رہنی چاہئیں (بشمول §§ 3، 7–11، 13) termination کے بعد باقی رہتی ہیں۔

## 13. ان شرائط میں تبدیلیاں

ہم یہ شرائط update کر سکتے ہیں۔ «آخری تازہ کاری» کی تاریخ بدلے گی۔ تبدیلیوں کے effective ہونے کے بعد continued use قبولیت ہے، سوائے جہاں مقامی قانون اضافی consent چاہے۔

## 14. Governing law

یہ شرائط OpenSelfHosting کے principal place of business پر لاگو قوانین کے تحت ہیں، conflict-of-law rules کے بغیر، سوائے جہاں آپ کے رہائشی ملک کی mandatory consumer protections لاگو ہوں اور waive نہ کی جا سکیں۔

## 15. رابطہ

- Support: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Security: [security@openselfhosting.com](mailto:security@openselfhosting.com)
- Product: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Company: [openselfhosting.com](https://openselfhosting.com) · [GitHub](https://github.com/OpenSelfHosting)

اگلا: [رازداری کی پالیسی](/ur/privacy) · [ڈاؤن لوڈ](/ur/guide/download) · [FAQ](/ur/guide/faq)
