
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
for i in $(ls $HOSTPATH | grep -v 'stt\|coursera' | egrep ^$j ) ; do 
echo "<a href=$baseurl$i>$i</a></br>"  | sudo tee -a $HOSTPATH/$j.html > /dev/null 
sudo chown agalan:www-data $HOSTPATH/$j.html
sudo chmod 440 $HOSTPATH/$j.html
done
done

sudo rm $HOSTPATH/.all-all.html
echo " This file cannot modify is automatically generated </br>" | sudo tee -a $HOSTPATH/.all-all.html  > /dev/null
for i in $a;do 
	echo  "<a href=$baseurl$i.html>$i.html</a></br>"  |  sudo tee -a $HOSTPATH/.all-all.html  > /dev/null
done
sudo chown agalan:www-data $HOSTPATH/.all-all.html
sudo chmod 440 $HOSTPATH/.all-all.html
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
actualdate=$(date  "+%Y%m%d")
if [ ! -f $HOSTBACKUP/daily-text-$actualdate.tar.gz ]; then
	tar -czf $HOSTBACKUP/daily-text-$actualdate.tar.gz $HOSTPATH
	chmod 444 $HOSTBACKUP/daily-text-$actualdate.tar.gz
	i487_sync 

	# sudo btrbk -q -c /data/src/personal/ebrain/btfbk.conf run

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


images_resize ()  #by size
{

PATHDIR="$1"
FILESIZE="$2"

find "$PATHDIR" -name "*jpg" -o -name "*png" | while read file;   # its better to read file or folders with spaces
do
#echo "$LINE"
  FILESIZE=$(stat -c%s "$file")
#  echo $FILESIZE
  if [ "$FILESIZE" -gt $2 ]
  then
  echo "$file is too large = $FILESIZE bytes."
  sudo mogrify -resize 70%  $file
  fi
done

}

video_resize ()

{

echo "resize videos"

}


function i487_resize_files
{
## resize images in order to preserve space

images_resize /data/rw1/img 360000

}


i487_reindex
i487_remove_older
i487_resize_files
i487_backup


