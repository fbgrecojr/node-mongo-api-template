#If Docker were to be used
#
FROM centos:centos7 #change to nm image
#FROM ws1.nml.com/ecc/appmod/vms/InteractiveApp_base_v1_0.box

MAINTAINER frankgreco@northwesternmutual.com

RUN yum install -y epel-release \
  && yum install -y nodejs npm

COPY package.json /src/package.json

RUN cd /src \
  && npm install

COPY . /src

EXPOSE 8080

CMD ["npm", "start"]