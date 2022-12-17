interface OGPTagInterface {
    tag: string;
    name: string;
    ogp_type: string;
    content: string;
}

abstract class BaseOGPTag implements OGPTagInterface {
    abstract tag: string;
    abstract name: string;
    abstract ogp_type: string;
    abstract content: string;
    public content_value: string | undefined | null = undefined;
    public tag_check(tag: Element) {
        if (tag.tagName.toLowerCase() == this.tag && tag.getAttribute(this.name) && tag.getAttribute(this.name) == this.ogp_type) {
            this.content_value = tag.getAttribute(this.content);
            return true;
        }
        return false;
    }
    public to_json() {
        return {
            "tag": this.tag,
            "name": this.name,
            "ogp_type": this.ogp_type,
            "content": this.content,
            "content_value": this.content_value
        }
    }
}

class URLOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:url";
    content = "content";
}
class TypeOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:type";
    content = "content";
}

class TitleOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:title";
    content = "content";
}

class DescriptionOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:description";
    content = "content";
}

class SiteNameOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:site_name";
    content = "content";
}

class ImageOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "property";
    ogp_type = "og:image";
    content = "content";
}


class TwitterCardOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "name";
    ogp_type = "twitter:card";
    content = "content";
}

class TwitterSiteOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "name";
    ogp_type = "twitter:site";
    content = "content";
}

class FasebookAppIdOGPTag extends BaseOGPTag {
    tag = "meta";
    name = "name";
    ogp_type = "fb:app_id";
    content = "content";
}


export class OGPMetaParser {

    metas: HTMLCollection;
    public ogptags = [
        new URLOGPTag,
        new TypeOGPTag,
        new TitleOGPTag,
        new DescriptionOGPTag,
        new SiteNameOGPTag,
        new ImageOGPTag,
        new TwitterCardOGPTag,
        new TwitterSiteOGPTag,
        new FasebookAppIdOGPTag,
    ];
    public constructor(metas: HTMLCollection) {
        this.metas = metas
    }

    public ogps = []
    build() {
        for (let meta of this.metas) {
            for (let ogptag of this.ogptags) {
                ogptag.tag_check(meta);
            }
        }
    }

    to_json() {
        let ogp_json = [];
        for (let ogptag of this.ogptags) {
            ogp_json.push(ogptag.to_json());
        }

        return {
            "ogp": ogp_json
        }
    }
}