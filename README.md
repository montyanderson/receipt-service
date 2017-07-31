# receipt-service

A microservice for printing receipts, built at [Tedra](https://github.com/tedra).

## Deployment

### Raspberry Pi

Download latest Node.js ARMv6 binaries.

``` bash
$ wget https://nodejs.org/dist/v8.2.1/node-v8.2.1-linux-armv6l.tar.xz
```

Extract and copy to `/usr/local`.

``` bash
$ tar xvfs node-v8.2.1-linux-armv6l.tar.xz
$ sudo cp -r node-v8.2.1-linux-armv6l/* /usr/local/
```

Add `pi` to the `lp` linux group and re-login.

``` bash
$ sudo adduser pi lp
$ su pi
```

Install dependencies and run the service.

``` bash
$ npm install
$ node index
```

You're done!

## API

### POST /raw
