# Credits, reuse terms and AI disclosure

New illustration, habitat, animation and presentation contributions are offered under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) to the extent rights exist, consistent with the repository data licence. Credit Kaisar Dauyey and the TE Mobilome Paper contributors (2026). Third-party source rights remain under their original terms; this notice does not relicense them or assert exclusive copyright in AI-generated elements. Animation source code is MIT licensed under the repository LICENSE. Do not imply endorsement by source authors.

## Photograph references

Each source photograph was cropped by the project, used as an AI subject reference, redrawn into a stylised illustration, then reposed and programmatically animated. Original photographs are not included in the web export. Retain this credit table with redistributed assets.

| Species | Source title | Creator | Original terms |
|---|---|---|---|
| *Acanthochromis polyacanthus* | [Acanthochromis polyacanthus.jpg](https://commons.wikimedia.org/wiki/File:Acanthochromis_polyacanthus.jpg) | Nikita | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| *Amphiprion ocellaris* | [Amphiprion ocellaris 497890888.jpg](https://commons.wikimedia.org/wiki/File:Amphiprion_ocellaris_497890888.jpg) | Pierre Pericard | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| *Amphiprion clarkii* | [Amphiprion Clarkii 1.jpg](https://commons.wikimedia.org/wiki/File:Amphiprion_Clarkii_1.jpg) | Karelj | Public domain (as documented by Commons source) |
| *Amphiprion percula* | [Clown.fish.arp.750pix.jpg](https://commons.wikimedia.org/wiki/File:Clown.fish.arp.750pix.jpg) | Adrian Pingstone | Public domain (as documented by Commons source) |
| *Premnas biaculeatus* | [Premnas biaculeatus, Andamán 2.jpg](https://commons.wikimedia.org/wiki/File:Premnas_biaculeatus,_Andam%C3%A1n_2.jpg) | Steve Childs | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| *Chrysiptera cyanea* | [Chrysiptera cyanea Gratwicke.jpg](https://commons.wikimedia.org/wiki/File:Chrysiptera_cyanea_Gratwicke.jpg) | Brian Gratwicke | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| *Dascyllus trimaculatus* | [Three-spot Dascyllus, Dibab, Rode Zee, EG imported from iNaturalist photo 150206525.jpg](https://commons.wikimedia.org/wiki/File:Three-spot_Dascyllus,_Dibab,_Rode_Zee,_EG_imported_from_iNaturalist_photo_150206525.jpg) | iNaturalist observer (CC0; no author named) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| *Chromis chromis* | [Chromis chromis 2.jpg](https://commons.wikimedia.org/wiki/File:Chromis_chromis_2.jpg) | Albert Kok | Public domain (as documented by Commons source) |
| *Abudefduf saxatilis* | [Gfp-sergeant-major.jpg](https://commons.wikimedia.org/wiki/File:Gfp-sergeant-major.jpg) | Yinan Chen | Public Domain (as documented by Commons source) |
| *Oreochromis niloticus* | [Oreochromis niloticus Egypt.jpg](https://commons.wikimedia.org/wiki/File:Oreochromis_niloticus_Egypt.jpg) | Magdy A. Saleh | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| *Danio rerio* | [Danio rerio port.jpg](https://commons.wikimedia.org/wiki/File:Danio_rerio_port.jpg) | Soulkeeper | Public domain (as documented by Commons source) |

## Illustration style reference

Stefano Vianello, drawing in Figure 1D of Gairin, Miura, Takamiyagi, Herrera and Laudet (2024), *The genome of the sapphire damselfish Chrysiptera cyanea: a new resource to support further investigation of the evolution of Pomacentrids*, Gigabyte, [doi:10.46471/gigabyte.144](https://doi.org/10.46471/gigabyte.144). The supplied article states CC BY 4.0. Used as visual inspiration for an original AI-generated drawing, not reproduced as an unmodified figure. Article authors and illustrator do not endorse this adaptation.

## Motion reference

Swimming-pose inspiration: user-supplied screenshot from [Chrysiptera cyanea, Monaco Nature Encyclopedia](https://www.monaconatureencyclopedia.com/chrysiptera-cyanea/?lang=en), photograph © Dr. Giuseppe Mazza. The publisher's [copyright notice](https://www.monaconatureencyclopedia.com/copyright/?lang=en) requires written permission for reproduction. This photograph is **not openly licensed** and is not redistributed in this package. It was used as a pose reference; generated artwork and programmed motion are transformations, not unmodified reproductions. Attribution does not grant permission to reproduce the source photograph. No claim is made that AI generation removes any third-party rights. The CC BY 4.0 offer covers only rights in new contributions and excludes the source photograph.

## AI and animation disclosure

The fish illustrations and coral/anemone vignettes were generated and edited using OpenAI's built-in image generation tool on 10 October 2026. The tool did not expose a model version. Existing species photographs supplied subject references; a published scientific illustration supplied initial style inspiration. The user selected the C. cyanea style draft and the swimming-pose reference. Full production prompts are in `prompts.json` and `motion-prompts.json`. Swimming variants are `*-motion-v2.png`; clean variants are `*-style-v1.png`.

Current v3 animation uses programmed regional mesh deformation for caudal and fin flutter, forward head-first movement angled slightly upward, a brief explicitly artistic eye blink, and a separately generated habitat layer with independent wave deformation. Timing and movement were qualitatively inspired by the user-supplied video `GOPR3971.MP4` (filmed by Kaisar Dauyey; “A. ocellaris inhabiting the coast of Aka island at the Kerama National Park, Okinawa, Japan”; original footage not redistributed). It is decorative motion, not recorded swimming, behavioural data, fin biomechanics, or a validated simulation. The anemone layer moves independently of the fish. The eye blink is an artistic convention and is not evidence of eyelid anatomy or observed behaviour. Fish fade briefly at the loop boundary to reset the forward path without a visible backward jump. The original whole-image v2 animation remains as an archived first pass in `animated/`; the gallery uses `animated-v3/`. Colours reflect reference individuals and may differ by sex, life stage, population and sequenced specimen. Genomic data and scientific tracks are not altered. This package is a supplementary visual companion; it has not been assigned a journal supplement number or inserted into the submission.

Suggested manuscript disclosure: “Species illustrations and habitat vignettes were produced with OpenAI image generation using attributed photographic references and published illustration-style inspiration. Animations were produced programmatically for visual presentation and do not represent observed behaviour or measured morphology. Source credits and licence notices accompany the supplementary files.”
