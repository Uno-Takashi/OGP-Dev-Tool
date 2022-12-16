interface OGPTag {
    tag: string;
    name: string;
    ogp_type: string;
}

class OGPTagClass implements OGPTag {
    tag: string;
    name: string;
    ogp_type: string;

    public constructor(tag: string, name: string, ogp_type: string) {
        this.tag = tag;
        this.name = name;
        this.ogp_type = ogp_type;
    }

    public tag_check(tag: HTMLElement) {
        return tag.tagName.toLowerCase() == this.tag && tag.getAttribute(this.name) && tag.getAttribute(this.name) == this.ogp_type
    }

}


class OGPMetaParser {

    metas: HTMLCollection;
    public constructor(metas: HTMLCollection) {
        this.metas = metas
    }

    public ogps = [new OGPTagClass("meta", "propaty", "og:discription"),]
    build() {

    }

    to_json() {
        return {

        }
    }
}