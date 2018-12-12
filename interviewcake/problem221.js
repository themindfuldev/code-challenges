/*
You left your computer unlocked and your friend decided to troll you by copying a lot of your files to random spots all over your file system.

Even worse, she saved the duplicate files with random, embarrassing names ("this_is_like_a_digital_wedgie.txt" was clever, I'll give her that).

Write a function that returns an array of all the duplicate files. We'll check them by hand before actually deleting them, since programmatically deleting files is really scary. To help us confirm that two files are actually duplicates, return an array of arrays ↴ where:

the first item is the duplicate file
the second item is the original file
For example:

  [['/tmp/parker_is_dumb.mpg', '/home/parker/secret_puppy_dance.mpg'],
 ['/home/trololol.mov', '/etc/apache2/httpd.conf']]
You can assume each file was only duplicated once.
*/
const fs = require('fs');

const visitFile = (path, file = '', filesMap = new Map()) => {
    const fullPath = path + (file ? `/${file}` : '');
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
        const { ctimeMs, size } = stats;
        const key = ctimeMs * size;

        let entry = filesMap.get(key);
        if (entry === undefined) {
            entry = [];
            filesMap.set(key, entry);
        }
        entry.push(fullPath);
    }
    else if (stats.isDirectory()) {
        const children = fs.readdirSync(fullPath);
        children.forEach(f => visitFile(fullPath, f, filesMap));
    }

    return filesMap;
}

const findDuplicates = filesMap => {
    const duplicates = [];    
    for (let [key, files] of filesMap) {
        const n = files.length;
        for (let i = 0; i < n-1; i++) {
            const f1 = files[i];
            const f2 = files[i+1];

            const f1mtimeMs = fs.statSync(f1).mtimeMs;
            const f2mtimeMs = fs.statSync(f2).mtimeMs;

            if (f1mtimeMs !== f2mtimeMs) {
                const [dup, original] = f1mtimeMs > f2mtimeMs ? [f1, f2]: [f2, f1];
                duplicates.push([dup, original]);
            }
        }
    }

    return duplicates;
};

(() => {
    console.log('Visiting files...');
    const filesMap = visitFile('/Users/tgarcia/Amazon Drive');

    console.log('Finding duplicates...');
    const duplicates = findDuplicates(filesMap);

    console.log(duplicates);
})();