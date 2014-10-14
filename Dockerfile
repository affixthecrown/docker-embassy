FROM embassy/mod_perl-base

#add apache config
ADD site.conf /etc/apache2/conf.d/site.conf

RUN useradd -m app


#just add the source code
ADD src/Obl-web/modules /usr/local/lib/perl/5.14.2/Obl

#and start apache
EXPOSE 80
