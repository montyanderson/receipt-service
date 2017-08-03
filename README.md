# receipt-service

A microservice for printing receipts, built at [Tedra](https://github.com/tedra).

[![dependencies Status](https://david-dm.org/montyanderson/receipt-service/status.svg)](https://david-dm.org/montyanderson/receipt-service)

![](http://i.imgur.com/xaSlRW4.jpg)

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

### Templating

Included is a configured `Mustache` template renderer, allowing control over formatting of text printed.

#### wrap

```
{{#wrap}}Lorem ipsum dolor sit amet, consectetur adipiscing elit....{{/wrap}}
```

```
Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Quisque pulvinar
fermentum massa non aliquet. Duis sed
porttitor nulla, vitae fermentum neque.
Sed nisi lorem, faucibus a auctor id,
interdum sed sem. Etiam pulvinar aliquam
rutrum. Sed consectetur rhoncus egestas.
Nunc risus dolor, mollis eget finibus sit
amet, viverra vitae leo.
```

#### centerWrap

```
{{#center}}Lorem ipsum dolor sit amet, consectetur adipiscing elit....{{/center}}
```

```
Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Quisque pulvinar
  fermentum massa non aliquet. Duis sed
 porttitor nulla, vitae fermentum neque.
  Sed nisi lorem, faucibus a auctor id,
 interdum sed sem. Etiam pulvinar aliquam
 rutrum. Sed consectetur rhoncus egestas.
Nunc risus dolor, mollis eget finibus sit
         amet, viverra vitae leo.
```

### Endpoints

#### POST /raw

Prints raw text data, without parsing it as a template.

```
$ curl -X POST --data "Hello, World" http://localhost:8080/raw
{"success":true}
```

#### POST /document

Prints text data, parsing it as a template.

```
$ curl -X POST --data "{{#centerWrap}}Hello, World{{/centerWrap}}" http://localhost:8080/document
{"success":true}
```

#### POST /order

Prints a receipt, formatting it as an order.

``` javascript
{
	merchant: "Tedra",
	date: "Monday, 31 July 2017",
	order: "Order #131390",
	total: "£1000402",
	text: "{{#centerWrap}}Thank you for shopping with us, we hope you enjoy maximum uptime with little latency.{{/centerWrap}}",
	items: [
		{
			name: "Node.js Microservice",
			price: "£1000000"
		},
		{
			name: "JSON API",
			price: "£400"
		},
		{
			name: "Extra Cheese",
			price: "£2"
		},
	]
}
```
