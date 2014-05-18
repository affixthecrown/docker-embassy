FROM embassy/mod_perl-base

#just add the source code
ADD src /usr/local/lib/perl/5.14.2/Embassy

#and start apache
EXPOSE 80
ENTRYPOINT ["/usr/sbin/apachectl"]
CMD ["-D","FOREGROUND"]
