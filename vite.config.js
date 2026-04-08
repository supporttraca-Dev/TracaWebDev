import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        explorer: resolve(__dirname, 'explorer.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        carte: resolve(__dirname, 'carte.html'),
        articles: resolve(__dirname, 'articles.html'),
        legal: resolve(__dirname, 'legal.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        archeologique: resolve(__dirname, 'lieux/archeologique.html'),
        funeraire: resolve(__dirname, 'lieux/funeraire.html'),
        funeraireV2: resolve(__dirname, 'lieux/funeraire-v2.html'),
        medina: resolve(__dirname, 'lieux/medina.html'),
        forteresse: resolve(__dirname, 'lieux/forteresse.html'),
        saharien: resolve(__dirname, 'lieux/saharien.html'),
        artTassili: resolve(__dirname, 'articles/art-tassili.html'),
        mersEddadjadj: resolve(__dirname, 'articles/mers-eddadjadj.html'),
        mosaiqueKhenchela: resolve(__dirname, 'articles/mosaique-khenchela.html'),
      }
    }
  }
})
