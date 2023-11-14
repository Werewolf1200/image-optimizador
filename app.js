import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
    try {
        const files = await fse.readdir(inputFolder);

        for (const file of files) {
            let inputPath = `${inputFolder}/${file}`;
            let outputPath = `${outputFolder}/${file}`;

            await sharp(inputPath).resize(targetWidth).toFile(outputPath);

            await imagemin([outputPath], {
                destination: outputFolder,
                plugins: [
                    imageminJpegtran({ quality: 80 }), // Comprimir JPEG a 80%
                    imageminPngquant(), // Comprimir PNG
                    imageminSvgo(), // Comprimir SVG
                    imageminWebp({ quality: 80 }), // Comprimir a 80%
                    imageminGifsicle(), // Comprimir Gif
                ],
            });

            console.log('Optimización finalizada con éxito');
        }
    } catch (error) {
        console.log(error);
    }
};

processImg();