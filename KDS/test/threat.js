const {dbConn} = require("../helpers/db.js");


const addThreats = async () => {
    const names = [
        {"threat_name": "Ransomware"},
        {"threat_name": "SQL Injection"},
        {"threat_name": "Social Engineering"},
        {"threat_name": "Phishing"},
        {"threat_name": "Malware"},
        {"threat_name": "Brute Force Attack"},
        {"threat_name": "Cross-Site Scripting (XSS)"},
        {"threat_name": "Denial of Service (DoS)"},
        {"threat_name": "Data Breach"},
        {"threat_name": "Man-in-the-Middle (MitM) Attack"},
        {"threat_name": "Zero-Day Exploit"},
        {"threat_name": "Insider Threat"},
        {"threat_name": "Credential Stuffing"},
        {"threat_name": "Cross-Site Request Forgery (CSRF)"},
        {"threat_name": "Botnet"},
        {"threat_name": "Drive-By Download"},
        {"threat_name": "Session Hijacking"},
        {"threat_name": "Adware"},
        {"threat_name": "Spyware"},
        {"threat_name": "Keystroke Logging"},
        {"threat_name": "Fileless Malware"},
        {"threat_name": "Rootkit"},
        {"threat_name": "Logic Bomb"},
        {"threat_name": "IoT-based Attacks"},
        {"threat_name": "DNS Spoofing"},
        {"threat_name": "Typosquatting"},
        {"threat_name": "Formjacking"},
        {"threat_name": "Watering Hole Attack"},
        {"threat_name": "Cryptojacking"},
        {"threat_name": "Eavesdropping"},
        {"threat_name": "Keylogger"},
        {"threat_name": "Backdoor"},
        {"threat_name": "Trojan Horse"},
        {"threat_name": "Worm"},
        {"threat_name": "Virus"},
        {"threat_name": "Pharming"},
        {"threat_name": "Bot"},
        {"threat_name": "Exploit Kits"},
        {"threat_name": "Distributed Denial of Service (DDoS)"},
        {"threat_name": "SIM Card Swap"},
        {"threat_name": "AI-based Threats"},
        {"threat_name": "Biometric Spoofing"},
        {"threat_name": "E-skimming"},
        {"threat_name": "Zero-Click Exploit"},
        {"threat_name": "Form Grabbing"},
        {"threat_name": "Crypto Malware"},
        {"threat_name": "Clickjacking"},
        {"threat_name": "Macro Virus"},
        {"threat_name": "Ad Fraud"},
        {"threat_name": "Gray Hat Hacking"},
        {"threat_name": "Bluejacking"},
        {"threat_name": "Red Team Attacks"},
        {"threat_name": "Cross-Platform Threats"},
        {"threat_name": "Phreaking"},
        {"threat_name": "Steganography"},
        {"threat_name": "Smishing"},
        {"threat_name": "Vishing"},
        {"threat_name": "Shimming"},
        {"threat_name": "Bait and Switch"},
        {"threat_name": "Session Fixation"},
        {"threat_name": "Ping of Death"},
        {"threat_name": "Hoax"},
        {"threat_name": "Spam"},
        {"threat_name": "Spoofing"},
        {"threat_name": "Impersonation"},
        {"threat_name": "Deep Packet Inspection"},
        {"threat_name": "Malvertising"},
        {"threat_name": "Honeypot"},
        {"threat_name": "Typosquatting"},
        {"threat_name": "Blue Snarfing"},
        {"threat_name": "Blue Bugging"},
        {"threat_name": "AI-powered Cyberattacks"},
        {"threat_name": "File Upload Vulnerability"},
        {"threat_name": "Form-based Attacks"},
        {"threat_name": "Click Fraud"}
    ];
    const threat_names = names.map((name) => name.threat_name);

    const randomDate = (endDate = null) => {
        let start = new Date(2021, 0, 1);
        const end = new Date(2023, 5, 1);

        const minIntervalDay = 60;
        const maxIntervalDay = 365;

        if(endDate) {
            start = new Date(endDate.getTime() - (Math.random() * (maxIntervalDay - minIntervalDay) + minIntervalDay) * 24 * 60 * 60 * 1000);

            return new Date(start.getTime() + Math.random() * (endDate.getTime() - start.getTime()));
        }

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const randomSequentialStartDate = (currentDate, minDays, maxDays) => {
        const intervalDays = Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);

        // Rastgele saat bilgisini ekleyin (0 ile 23 saat arasında)
        currentDate.setHours(Math.floor(Math.random() * 24));

        return new Date(currentDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);
    };

    const randomNumber = () => {
        const min = 1;
        const max = 372;

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomThreat = () => {
        const min = 0;
        const max = threat_names.length - 1;

        return threat_names[Math.floor(Math.random() * (max - min + 1) + min)];
    }

// Başlangıç tarihini belirle
    let startDate = new Date(2021, 0, 3);

    const numberOfThreats = 4182;

    for (let i = 1; i <= numberOfThreats; i++) {
        const endDate = randomDate(startDate);
        startDate = randomSequentialStartDate(startDate, 0, 1);

        if(endDate.getTime() > new Date().getTime()) {
            break;
        }

        dbConn.query("INSERT INTO tehditler(tehdit_id, tehdit_ad, tehdit_sayisi, baslangic_tarihi, bitis_tarihi) VALUES(?,?,?,?,?)", [i, randomThreat(), randomNumber(), startDate, endDate],(err,result)=> {
            console.log(err)
        })
    }

}



addThreats()
