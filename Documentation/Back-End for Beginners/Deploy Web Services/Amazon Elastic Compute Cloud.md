Amazon Elasit Compute Cloud atau Amazon EC2 merupakan salah satu layanan komputasi elastis di cloud yang ditawarkan oleh AWS. EC2 merupakan sebuah komputer server yang dapat dimiliki secara virtual namun tidak dapat dilihat fisiknya. Walaupun tak tampak secara fisik, komputer ini tetap bisa Anda operasikan di mana saja karena ia disimpan di awan (_cloud_) yang notabene awan dapat dilihat di mana saja.

Komputer server ini bersifat elastis karena ia dapat menyesuaikan kapasitasnya berdasarkan permintaan dari client. Semakin banyak permintaan yang datang, semakin besar pula kapasitas server. Dengan begitu, server Anda tidak akan mengalami _down_ jika tiba-tiba bisnis Anda membeludak. 

EC2 sejatinya adalah virtual komputer atau _virtual machine_ yang dapat diatur spesifikasinya melalui sebuah sistem tanpa harus berupaya dengan perangkat keras. Itulah mengapa ia disebut komputasi elastis.

## 1. Membuat Akun AWS

## 2. Membuat dan Menjalankan Amazon EC2 Instance

Akses menu ***All Services -> Compute -> EC2***, pada Amazon EC2 Dashboard klik tombol ***Launch Instance*** untuk membuat EC2 Instance.

Untuk saat ini, isi formulir yang tersedia dengan nilai dan instruksi berikut 

1. **Name and tags**: Web Server
2. **Application and OS Images**: Ubuntu Server (LTS terbaru)
3. **Instance type**: t2.micro
4. Key pair (login):
	1. Klik **Create new key pair.**
	2. **Key pair name:** _notes-api-webserver._
	3. Klik **Create key pair.**
	4. Pastikan berkas _notes-api-webserver.pem_ terunduh.
	5. Simpan berkas pem yang terunduh pada lokasi yang aman. Karena berkas ini digunakan ketika hendak mengoperasikan instance melalui SSH, jadi jangan sampai hilang yah. Agar mudah, taruh saja berkas tersebut di dalam folder proyek _notes-app-back-end_.
5. Network settings:
	1.  Klik **Edit**.
	2.  **Security group name**: _app-server-sg._
	3.  **Description:** Allow custom TCP port 5000
	4.  Klik **Add security group rule**.
	5.  Isi security group baru dengan nilai:
	    1.  **Type**: _Custom TCP_
	    2.  **Port range**: _5000_
	    3.  **Source type**: _Anywhere_
	    4.  **Description**: _Application Port_

Untuk terhubung terhadap EC2 Instance, buka terminal dan jalankan 

```powershell
ssh -i "notes-api-webserver.pem" ubuntu@ec2-54-169-90-73.ap-southeast-1.compute.amazonaws.com
```

## 3. Mengunggah Proyek ke Github

Git merupakan sebuah sistem yang membantu developer dalam melakukan _versioning_ atau source code management terhadap aplikasi yang dikembangkan. Melalui Git, kita dapat menelusuri perubahan kode, siapa yang melakukan perubahannya, hingga mengelola _code versioning_ (branching). Tools ini kerap digunakan sebagai tools berkolaborasi antar developer.

Ketahuilah bahwa sistem git ini hanya berjalan di lokal komputer Anda saja. Agar repository git dapat diakses di mana saja, oleh siapa saja, dan komputer mana saja (termasuk EC2), kita perlu menyimpan repository-nya di internet. Nah, di sinilah peran dari GitHub. Ia merupakan salah satu vendor yang bergerak di bidang source code hosting menggunakan teknologi git.

## 4. Monitoring Server

Dengan menggunakan Process Manager, Anda tidak perlu khawatir bila aplikasi Node.js terhenti disebabkan oleh crash, ia akan menjalankan ulang prosesnya secara otomatis hampir tanpa _downtime_. Selain itu, Process Manager dapat membantu menyeimbangkan muatan proses pada CPU yang tersedia di server, hal ini biasa disebut sebagai _load balancing_. Dengan begitu, aplikasi server dapat diakses secara lebih cepat dibandingkan dijalankan menggunakan node process secara langsung.

### Memasang Node.js Process Manager pada EC2 instance

```powershell
npm install -g pm2
```

Untuk menjalankan Process Manager, gunakan perintah:

```powershell
pm2 start npm --name "notes-api" -- run "prod"
```

Di pm2, kita dapat me-restart proses secara manual dengan cara:

```powershell
pm2 restart notes-api
```

Atau, menghentikan prosesnya dengan cara:

```powershell
pm2 stop notes-api
```

Untuk menjalankan kembali proses, gunakan perintah:

```powershell
pm2 start notes-api
```

