
#!/bin/bash
HOSTPATH="/data/rw1/m1"
HOSTBACKUP="/data/rw1/backup"
HOSTPATHIMAGES="/data/rw1/img"
i487_reindex (){
echo "reindex i487"

baseurl="read6.php?url="

a="170
180
chinese-
com-
eco-
ideas-
it-
m1-
mind-
todo-
ai-
events-
grandtop-
id-
learn-
me-
bu-
osint-
ocr-
stt-
"

for j in $a
do
sudo rm $HOSTPATH/$j.html
for i in $(ls $HOSTPATH | grep -v 'stt\|coursera' | egrep ^$j ) ; do echo "<a href=$baseurl$i>$i</a></br>"  >> $HOSTPATH/$j.html ; done
done

sudo rm $HOSTPATH/.all-all.html
echo " This file cannot modify is automatically generated </br>" >> $HOSTPATH/.all-all.html
for i in $a;do 
	echo "<a href=$baseurl$i.html>$i.html</a></br>" >> $HOSTPATH/.all-all.html
done
chmod 440 $HOSTPATH/.all-all.html
echo "look at raiz http://i487.lxc/$baseurl.all-all.html"

# remove absolute path
aa=$(pwd)
cd $HOSTPATH
# for f in "$(ls *.html)"; do sed  -e "s/http:\/\/i487.lxc\///g" $f > tmp.html ; cp tmp.html $f ; done
cd $aa

}


function i487_sync 
{

rsync -av --rsync-path="sudo rsync" --chown=www-data:www-data /data/rw1/img  i487.com:/data/rw1/
rsync -av --rsync-path="sudo rsync" --chown=www-data:www-data /data/rw1/m1  i487.com:/data/rw1/

}


function i487_backup
{

# backup every quarter hour
# remove all quarterly from previous day
actualdate=$(date  "+%Y%m$d")
if [ -f $HOSTBACKUP/daily-text-$actualdate.tar.gz ]; then
	tar -czf $HOSTBACKUP/daily-text-$actualdate.tar.gz $HOSTPATH
	i487_sync 
	sudo btrbk -q -c /data/src/personal/ebrain/btfbk.conf run
	rm $HOSTBACKUP/quarterly*
fi
actualdate=$(date  "+%Y%m$d%H%M")
tar -czf $HOSTBACKUP/quarterly-text-$actualdate.tar.gz $HOSTPATH
}

function i487_backup_images
{
	echo "doing images backup"


}

function i487_remove_older
{
# remove files older than 90 days
find /data/rw1/backup/* -ctime +90 -delete;

}

i487_backup
i487_backup_images
i487_reindex
i487_remove_older
