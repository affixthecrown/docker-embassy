FROM embassy/mod_perl-base

#add apache config
ADD site.conf /etc/apache2/conf.d/site.conf

RUN useradd -m app


#add the perl source
ADD src/Obl-web/modules /usr/local/lib/perl/5.14.2/Obl

#add the JS....._

#and start apache
EXPOSE 80
ENTRYPOINT ["/usr/sbin/apachectl"]
CMD ["-D","FOREGROUND"]
