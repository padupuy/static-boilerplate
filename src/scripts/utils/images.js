import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';

const allImages = document.querySelectorAll('img');
objectFitImages(allImages);
picturefill();
