FROM embassy/mod_perl-base

ADD src /usr/local/lib/perl/5.14.2/Embassy
ADD hosts_addition /root/hosts_addition
RUN cat /root/hosts_addition >> /etc/hosts

EXPOSE 80
ENTRYPOINT ["/usr/sbin/apachectl"]
CMD ["-D","FOREGROUND"]
