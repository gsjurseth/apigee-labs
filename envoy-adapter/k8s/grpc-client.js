/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
var metadata = new grpc.Metadata();
var apikey = process.argv[3];
metadata.add('x-api-key', apikey);

function main() {
	var grpcHost = process.argv[2];
  var client = new hello_proto.Greeter(grpcHost,
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 5) {
    user = process.argv[4];
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, metadata, function(err, response) {
    if (response)
      console.log('Greeting:', response.message);
    else
      console.log('The sayHello call failed:', err.message);
  });
}

main();
