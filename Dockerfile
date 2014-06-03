FROM embassy/mod_perl-base

#add apache config
ADD site.conf /etc/apache2/conf.d/site.conf


#just add the source code
ADD src /usr/local/lib/perl/5.14.2/Embassy

#and start apache
EXPOSE 80
ENTRYPOINT ["/usr/sbin/apachectl"]
CMD ["-D","FOREGROUND"]
