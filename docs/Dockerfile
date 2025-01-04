FROM ruby:2.6.3
RUN apt-get update && \
  apt-get install -y nodejs npm

RUN apt-get install -y libjson-xs-perl libyaml-perl
RUN apt-get install -y vim less

RUN mkdir /work
WORKDIR /work

RUN git clone https://github.com/slatedocs/slate.git
WORKDIR /work/slate
RUN gem install bundler:2.1.4
RUN bundle install

WORKDIR /work
RUN npm -g i widdershins

COPY ./compile /work/compile
RUN ["chmod", "+x", "/work/compile"]

CMD "/work/compile"

