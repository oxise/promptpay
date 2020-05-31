# promptpay


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install -S qrcode-gbpay
```

## Examples

```
const { PromptPay } = require('qrcode-gbpay');

var app = express();

// Create QRCode
app.post('/genqrcode', (req, res)=>{

    /*
    @obj {
        amount: Number,
        detail: String,
        referenceNo: Number, // เลขที่อ้างอิง เช่น 20171128001 (4 ตัวแรกเป็น ปี คศ. 2 ตัวถัดไปเป็น เดือน 2  ตัวถัดไปเป็นวันที่ 3 ตัวหลังเป็นการรันเลขตามลาดับ)
        token: String, // GBPAY Token
        webhook: String // url webhook เป็นการตอบกลับหลังจากที่ทำรายการสำเร็จ ฝั่ง Server
    }
    */

    var refNo = Math.floor(Date.now() / 1000);

    PromptPay({
        amount: 10.00,
        detail: 'deposit credit by QRcode Oxise.IO',
        referenceNo: refNo,
        token: " GBPAY Token  ",
        webhook: 'https://domain.com/api/billing/webhook'
     }).then(resp =>{

          // Response { data: 'QRCode png base64 ' }

        res.json(resp);       

    }).catch(err =>{
        res.status(422).json({ errors: err.message });
    })

});

/// WebHook

app.post('/api/billing/webhook', (req, res)=>{

    var data = req.body;

    /*
    @data from  webhook Type Josn 
    {
        amount: 1,
        referenceNo: '1540731943',
        gbpReferenceNo: 'gbp0499142659',
        currencyCode: '764',
        resultCode: '00',
        totalAmount: 1,
        thbAmount: 1 
    }
    */
    
    // condition
    

    // end 

    res.json({satus: true});



});



```

## License

The MIT License (MIT)

Copyright (c) 2018 Aitthi Arsa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

