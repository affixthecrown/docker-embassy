FROM embassy/mod_perl-base

ADD src /usr/local/lib/perl/5.14.2/Embassy

EXPOSE 80
ENTRYPOINT ["/usr/sbin/apachectl"]
CMD ["-D","FOREGROUND"]
