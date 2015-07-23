var path = require("path");

module Manifesto {
    export class Canvas implements ICanvas{
        id: string;
        jsonld: any;
        manifest: IManifest;
        ranges: IRange[] = [];
        type: CanvasType;
        width: number = 0;
        height: number = 0;

        getLabel(): string {
            var regExp = /\d/;

            if (regExp.test(this.jsonld.label)) {
                return this.manifest.getLocalisedValue(this.jsonld.label);
            }

            return null;
        }

        getRange(): IRange {
            // get the deepest Range that this Canvas belongs to.
            return this.ranges.last();
        }

        // todo: if a specific thumbnail service is provided use that
        // Prefer thumbnail service to image service if supplied and if
        // the thumbnail service can provide a satisfactory size +/- x pixels.
        getThumbUri(width: number, height: number): string {

            var uri;

            if(this.jsonld.thumbnail){
                return this.jsonld.thumbnail;
            } else if (this.jsonld.resources){
                // todo: create thumbnail serviceprofile and use manifest.getService
                uri = this.manifest.getService() this.jsonld.resources[0].resource.service['@id'];
            } else if (this.jsonld.images && this.jsonld.images[0].resource.service){
                // todo: create thumbnail serviceprofile and use manifest.getService
                uri = this.jsonld.images[0].resource.service['@id'];
            } else {
                return null;
            }

            // todo: allow region, rotation, quality, and format as parameters?
            var tile = 'full/' + width + ',' + height + '/0/default.jpg';

            return path.join(uri, tile);
        }
    }
}
