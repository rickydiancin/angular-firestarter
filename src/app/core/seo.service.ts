import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      // title: 'Angular <3 Linkbots',
      // description: 'My SEO friendly Angular Component',
      // image: 'https://angularfirebase.com/images/logo.png',
      // slug: '',
      ...config
    }


    this.meta.addTag({ name: 'description', content: config.description });

    this.meta.addTag({ name: 'twitter:card', content: 'summary' });
    this.meta.addTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.addTag({ name: 'twitter:title', content: config.title });
    this.meta.addTag({ name: 'twitter:description', content: config.description });
    this.meta.addTag({ name: 'twitter:image', content: config.image });

    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:site_name', content: 'Gentec Australia' });
    this.meta.addTag({ property: 'og:title', content: config.title });
    this.meta.addTag({ property: 'og:description', content: config.description });
    this.meta.addTag({ property: 'og:image', content: config.image });

}
