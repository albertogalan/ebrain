
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

function i487_backup
{
actualdate=$(date  "+%Y%m$d%H%M")
tar -czf $HOSTBACKUP/text-$actualdate.tar.gz $HOSTPATH
# tar -czf $HOSTBACKUP/text-$actualdate.tar.gz $HOSTPATHIMAGES
}

function i487_backup_images
{
	echo "doing images backup"
}

i487_backup
i487_backup_images
i487_reindex