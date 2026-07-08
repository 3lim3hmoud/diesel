# DIESEL CLOUD — دليل التركيب (خطوة بخطوة)

الهدف: تخلي اللعبة تشتغل فعليًا وانت بعيد (World Tick حقيقي كل ٢٠ دقيقة)، والحالة تتخزن على سيرفر مش بس المتصفح، وتوصلك إشعارات حقيقية على الموبايل. كل حاجة **مجانية بالكامل** (Firebase Spark + Cloudflare Workers Free).

مهم: لو مأخدتش الخطوات دي، الموقع هيفضل شغال بالظبط زي دلوقتي (localStorage بس) — مفيش حاجة هتتكسر.

---

## 1) اعمل مشروع Firebase

1. روح [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → سمّيه مثلاً `diesel-command`.
2. مش لازم Google Analytics، تقدر تعمله Disable.
3. من الشاشة الرئيسية للمشروع، دوس على أيقونة **Web (`</>`)** عشان تضيف تطبيق ويب، سمّيه `diesel-web`.
4. هيديك object فيه `apiKey`, `authDomain`, `projectId`, إلخ — **انسخهم**.
5. افتح `js/firebase-config.js` في المشروع، واستبدل الـ placeholders بالقيم دي.

## 2) فعّل Anonymous Authentication

1. من القائمة الجانبية: **Build → Authentication → Get started**.
2. تبويب **Sign-in method** → فعّل **Anonymous**.

كده كل جهاز بيدخل الموقع بياخد هوية فريدة (UID) تلقائيًا من غير أي تسجيل دخول يدوي.

## 3) فعّل Firestore

1. **Build → Firestore Database → Create database**.
2. اختار **Production mode** (مش Test mode).
3. اختار أقرب Location (مثلاً `eur3` أو `europe-west`).
4. بعد الإنشاء، روح تبويب **Rules**، وانسخ محتوى ملف `firestore.rules` من المشروع والصقه هناك، ودوس **Publish**.

القواعد دي بتضمن إن كل مستخدم يقدر يقرا/يكتب بس الحالة بتاعته هو (مبنية على الـ UID).

## 4) فعّل Cloud Messaging + استخرج VAPID key

1. **Build → Cloud Messaging** (أو من Project settings → Cloud Messaging tab).
2. لو مش شغالة، فعّلها.
3. انزل لـ **Web configuration → Web Push certificates** → دوس **Generate key pair**.
4. انسخ الـ key وحطه في `js/firebase-config.js` مكان `DIESEL_VAPID_KEY`.

## 5) استخرج Service Account (للـ Cloudflare Worker بس — سري جدًا)

1. **Project settings (الترس) → Service accounts**.
2. دوس **Generate new private key** → هيبعتلك ملف JSON.
3. **متحطش الملف ده في الريبو أبدًا** — فيه فتحين خاصين بمشروعك الكامل. احتفظ بيه على جهازك بس.
4. فيه اتنين هتحتاجهم بعدين: `client_email` و `private_key`.

## 6) ارفع الموقع نفسه على GitHub Pages (زي العادة)

نفس الخطوات القديمة — ارفع كل الملفات (بما فيها الملفات الجديدة: `js/firebase-config.js`, `js/cloud-sync.js`, `firestore.rules`, `SETUP-CLOUD.md`, ومجلد `worker/`) على الريبو، وفعّل GitHub Pages.

مجلد `worker/` مش هيتأثر ولا يظهر للمستخدم — هو بس كود الـ Cloudflare Worker المنفصل، مش جزء من الموقع.

## 7) جهّز ونشر الـ Cloudflare Worker

فيه طريقتين — اختار اللي أسهل ليك:

### الطريقة أ) من المتصفح بس (من غير Terminal ولا تثبيت أي حاجة) — الأسهل
1. روح **dash.cloudflare.com** واعمل حساب مجاني (بس إيميل وباسورد).
2. من القائمة الجانبية: **Workers & Pages → Create**.
3. اختار **Create Worker** → سمّيه `diesel-world-tick` → **Deploy** (هيديك نسخة "Hello World" افتراضية أول حاجة).
4. بعد ما يتعمل الـ deploy، دوس **Edit code** (أو **Quick edit**) — هيفتحلك محرر كود جوه المتصفح.
5. امسح كل الكود اللي موجود، وانسخ والصق **كل** محتوى ملف `worker/diesel-worker.js` من المشروع مكانه.
6. دوس **Save and deploy** (أو **Deploy**) فوق.
7. روح تبويب **Settings** (إعدادات الـ Worker) → **Variables and Secrets**:
   - دوس **Add** → الاسم `FIREBASE_PROJECT_ID` → النوع **Text** → القيمة: الـ projectId بتاعك (نفس اللي في `firebase-config.js`).
   - دوس **Add** تاني → الاسم `FIREBASE_CLIENT_EMAIL` → النوع **Secret** (مشفّر) → القيمة: انسخها من ملف الـ service account JSON، من حقل `"client_email"`.
   - دوس **Add** تاني → الاسم `FIREBASE_PRIVATE_KEY` → النوع **Secret** → القيمة: انسخ حقل `"private_key"` **بالكامل** من نفس ملف الـ JSON (يشمل `-----BEGIN PRIVATE KEY-----` و`-----END PRIVATE KEY-----` والأسطر اللي بينهم). دوس **Save**.
8. روح تبويب **Triggers** (أو **Settings → Triggers**) → قسم **Cron Triggers** → **Add Cron Trigger** → اكتب:
   ```
   */20 * * * *
   ```
   ده معناه "كل ٢٠ دقيقة" → **Save**.
9. جرّبه يدويًا: انسخ رابط الـ Worker (شكله `https://diesel-world-tick.YOUR-SUBDOMAIN.workers.dev`) والصقه في تبويب جديد في المتصفح. لو كله تمام هيرجعلك JSON فيه `"ok": true`. لو فيه غلط هيوريك رسالة الخطأ بالظبط (زي مفتاح غلط أو صلاحيات ناقصة).

### الطريقة ب) عن طريق Terminal (`wrangler`) — لو مرتاح للـ command line
نفس اللي مكتوب تحت — تحتاج Node.js مثبت على جهازك، بعدين:
```bash
cd worker
npm install -g wrangler
wrangler login
wrangler secret put FIREBASE_CLIENT_EMAIL
wrangler secret put FIREBASE_PRIVATE_KEY
wrangler deploy
```
وعدّل `wrangler.toml` بحط الـ projectId بتاعك مكان `PASTE_PROJECT_ID` قبل الـ deploy.

## 8) جرّب

1. افتح الموقع من المتصفح، وادخل `settings.html` → لازم تلاقي **CLOUD SYNC: CONNECTED**.
2. دوس **ENABLE** جنب PUSH NOTIFICATIONS ووافق على الإذن.
3. اعمل أي فعل (ground op، broadcast، إلخ) وسيبه شوية.
4. زور رابط الـ Worker يدويًا (`https://.../`) عشان تشغّل tick فوري بدل ما تستنى ٢٠ دقيقة — لو فيه alert جديد المفروض توصلك نوتيفيكيشن على الجهاز حتى لو الموقع مقفول.

---

## ملاحظات مهمة

- **الحد المجاني**: Firestore بيدّيك ٥٠ ألف قراءة و٢٠ ألف كتابة يوميًا مجانًا — أكتر بكتير من احتياج مستخدم واحد أو حتى عشرات. Cloudflare Workers بيدّيك ١٠٠ ألف طلب يوميًا مجانًا، والـ Cron جوه الحد ده برضه.
- **الأمان**: أي حد يفتح الموقع بيبقى مستخدم Anonymous منفصل بحالته الخاصة — محدش يقدر يشوف أو يعدّل حالة حد تاني بسبب الـ Firestore Rules.
- **لو مغيّرتش حاجة في `js/firebase-config.js`**: كل حاجة هتفضل شغالة زي الأول محليًا (localStorage) من غير أي تأثير — الكود بيتأكد إن الإعدادات متملية قبل ما يحاول يتصل بأي حاجة.
- **مزامنة بين أجهزة**: لو فتحت من جهازين مختلفين، آخر تحديث (الأحدث في `updatedAt`) هو اللي بيكسب — يعني لو لعبت من الموبايل وبعدين فتحت من اللابتوب، هيسحب أحدث حالة تلقائيًا.
- **لو عايز تغيّر أي رقم في اللعبة** (heat decay، threat scores، إلخ) لازم تغيّره في **مكانين**: `js/state.js` (للمتصفح) و `worker/diesel-worker.js` (للسيرفر) — الملف التاني فيه تعليق أعلى الثوابت يفكّرك بكده.
