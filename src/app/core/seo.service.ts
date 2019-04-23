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


    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ name: 'twitter:card', content: 'website' });
    this.meta.updateTag({ name: 'twitter:site', content: 'https://twitter.com/GentecAustralia' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Gentec Australia' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.addTag({ property: 'og:image', content: config.image });

  }

}