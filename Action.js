let readerStyle = `
#yawas-readerview{
  background-color:black;
  font-family:-apple-system,sans-serif;
  font-size:16px;
  margin:0 auto;
  display:block;
  padding:16px;
  position:fixed;
  width:100vw;
  height:100vh;
  overflow:auto;
  z-index:2147483638;
  top:0;
}
#articlebody{
  background-color:white;
  line-height:150%;
  padding:16px;
  /*width:calc(100% - 2 * var(--marginsize));*/
  max-width:640px;
  margin:0 auto;
  word-wrap:break-word;
}

#articlebody div{padding-bottom:1em}

#articlebody pre{
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    -webkit-text-size-adjust: none;
}

#articlebody .fullscreenvideo{position:fixed;left:0;top:128;width:100%;height:320px;z-index:40000}
#articlebody .audiobutton{font-family:var(--fontname)}
#articlebody code{white-space:pre;word-break:break-all;word-wrap:normal;counter-reset:linenumber}
#articlebody .codewrapper {-webkit-overflow-scrolling:touch;max-width:calc(100% - 16px);overflow-x:scroll;padding:8px;background-color:#f5f5f5;border:0px solid gray;border-radius:0px;}
#articlebody img{display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto}
#articlebody .slide {width:  100%;}
#articlebody video{background-color:#ccc;border:0;display:block;max-width:100%}
#articlebody iframe{margin-left:auto;margin-right:auto;frame-border:0;border:0;display:block;max-width:100%}
#articlebody a {text-decoration:none; color:#4099FF}
#articlebody date{font-size:80%;padding:12px;text-align:center; color:gray}
#articlebody blockquote,#articlebody q,#articlebody cite{word-break:break-all;word-wrap;margin-left:0px;padding-left:8px;border-left:2px solid orange;display:inline-block}
#articlebody figure{padding:0;margin:8px;width:100%;max-width:100%}
#articlebody figcaption{font-size:90%;margin:8px;color:gray}
#articlebody .highlight{background-color:yellow}
#articlebody .queryhighlight{background-color:orange!important}
#articlebody .highlightsnippet{/*border-radius:4px;border:1px solid #ccc;*/margin:8px;padding:8px}
#articlebody .commentsnippet{border-radius:4px;border:1px solid #ccc;margin:8px;padding:8px;color:black;background-color:white}
#articlebody .normalword{background-color:transparent!important;border-bottom:0!important}

#articlebody dd {margin-left: 8px;margin-right:8px}

#articlebody h1{font-weight:bold;font-size:120%}
#articlebody h2{font-weight:normal;font-size:100%;color:gray}
#articlebody h3,h4,h5,h6{font-weight:500;font-size:100%}

#articlebody .titleheader{}
#articlebody button{display:block}
#articlebody .tablecontainer{max-width:100%;overflow:auto}

#articlebody .twitter-tweet{
    color: #1c2022; background-color:white;
    padding:0;
    border: 1px solid #ccc;
    border-width: 1px;
    border-radius: 4px;
    font-weight:normal;
    font-size:16px;
    line-height:22.4px;
    font-style:normal;
    margin:0px;
    margin-top:1.5em;margin-bottom:1.5em;
    max-width:500px;
}
#articlebody .twitter-tweet a {color:#4099FF}
#articlebody .twitter-tweet div {margin:0;padding-top: .9rem; padding-left:8px;padding-right:8px; font-weight:bold }
#articlebody .twitter-tweet div a {font-size: .875rem;display:block;color:#697882;font-weight:normal }
#articlebody .twitter-tweet-verified{
    width: 1.11111em;
    background-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h64v72H0z%22%2F%3E%3Cpath%20fill%3D%22%2388c9f9%22%20d%3D%22M3%2037.315c0%204.125%202.162%207.726%205.363%209.624-.056.467-.09.937-.09%201.42%200%206.103%204.72%2011.045%2010.546%2011.045%201.295%200%202.542-.234%203.687-.686C24.22%2062.4%2027.827%2064.93%2032%2064.93c4.174%200%207.782-2.53%209.49-6.213%201.148.45%202.39.685%203.69.685%205.826%200%2010.546-4.94%2010.546-11.045%200-.483-.037-.953-.093-1.42C58.83%2045.04%2061%2041.44%2061%2037.314c0-4.37-2.42-8.15-5.933-9.946.427-1.203.658-2.5.658-3.865%200-6.104-4.72-11.045-10.545-11.045-1.302%200-2.543.232-3.69.688-1.707-3.685-5.315-6.216-9.49-6.216-4.173%200-7.778%202.53-9.492%206.216-1.146-.455-2.393-.688-3.688-.688-5.827%200-10.545%204.94-10.545%2011.045%200%201.364.23%202.662.656%203.864C5.42%2029.163%203%2032.944%203%2037.314z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M17.87%2039.08l7.015%206.978c.585.582%201.35.873%202.116.873.77%200%201.542-.294%202.127-.883.344-.346%2015.98-15.974%2015.98-15.974%201.172-1.172%201.172-3.07%200-4.243-1.17-1.17-3.07-1.172-4.242%200l-13.87%2013.863-4.892-4.868c-1.174-1.168-3.074-1.164-4.242.01-1.168%201.176-1.163%203.075.01%204.244z%22%2F%3E%3C%2Fsvg%3E);
    background-repeat:no-repeat;
    display: inline-block;
    height: 1.25em;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: text-bottom;
}
#articlebody .tags{font-size:16px;margin:0px;padding:0;position:fixed;bottom:0;right:0;z-index:20}
#articlebody .tagon{font-family:var(--fontname);margin:8px;color:white;background-color:orange;border-radius:3px;padding:8px 12px}

#articlebody mark{background-color:transparent;font-weight:bold}


@media screen and (max-device-width: 480px) and (orientation: portrait){
    #articlebody table{max-width:280px}
}

@media screen and (max-device-width: 640px) and (orientation: landscape){
    #articlebody table{max-width:580px}
}
@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px)
and (-webkit-min-device-pixel-ratio: 1) {
    #articlebody table{max-width:580px}
    #articlebody body{margin:16px;}
}
@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px)
and (-webkit-min-device-pixel-ratio: 2) {
    #articlebody table{max-width:580px}

    #articlebody body{margin:16px;}
}

#articlebody .blockimage{display:block}

#articlebody .readerviewslide {
    position:relative;
    width:100%;
    height:240px;
    padding:0px;
    margin: 0px;
    display:block}
#articlebody .readerviewslideimage {
    text-align:center;
    display:block;
    width:100%;height:100%;
    background-repeat:no-repeat;
    background-size:contain;
    position: absolute;
    left: 0px;top: 0px;
    opacity: 0;z-index: 1;
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
}
#articlebody .showing {
    opacity: 1;
    z-index: 2;
}
#articlehighlights{display:none}

#articlebody .figurewrapper{
    max-width:calc(100% - 16px);
    overflow-x:auto;
    overflow-y:hidden;
    padding:0px;
    -webkit-overflow-scrolling:touch;
}

#articlebody .figc{
  max-width:calc(100% - 16px);
  overflow-x:auto;
  overflow-y:hidden;
  padding:8px 0;
  -webkit-overflow-scrolling:touch;
}
#articlebody .pdffig{
  background-color:white;
  background-repeat:no-repeat;
  padding:0px;
  margin:0px;
  display:block;
  min-width:0;
  max-width:2000%;height:auto;
}
#articlebody .reflowpage{
  word-wrap: break-word;
  margin-left:calc(-1 * var(--marginsize));
  max-width:calc(100vw - 2 * var(--marginsize));
  width:100vw;
  padding:var(--marginsize);
  border-bottom:8px solid var(--pdf-split-color);
}
#articlebody .reflowpage:last-child{border-bottom:0px solid red}
#articlebody .pdfimage {border:2px solid red;}

#articlebody .regularsizeimage{
  min-width:0;
}

#articlebody ul,#articlebody ol{margin-left:-16px}

#articlebody .svgcontainer{max-width:100%;overflow:hidden;display:inline-block;}
#articlebody .svgcontainer > svg {width:100%;height:100%;}
#articlebody .pdfpage{margin:16px auto;border-bottom:2px solid #ccc}
#articlebody .pdfpage:last-child{border-bottom:0;margin-bottom:0}
#articlebody .swipetohighlight{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
`;
var LoloAction = function() {};

const MIN_TABLE_CONTENT_LENGTH = 128;
const KEEP_HIDDEN = false;

function mydecode(s) {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
}

const removeSelectors = [
  '#yawas_highlightswrapper',
    '.sharer',
    '.sics-component__caption__top-line',
    '.sics-component__html-asset',
    'sics-component__html-asset--no-scale',
    '.ovu-video-duration',
    '.sics-component__byline-wrapper',
    '.sics-component__sharebar',
    '.n3rdFont','.blogDate','.adsbygoogle','#mobile-ad-wrapper',
    '#CybotCookiebotDialog','.RelatedPosts','.Post-latest-articles','.Post-comments',
    '.InlineDonationPromo-container','.NewsletterEmbed-container',
    '.RelatedContent-module__container--inner','.spectator-mobile-nav__list','.spectator-icon',
    '.gallery__indicators','.sharesheet','.cta_button',
    '.PostsPage-secondaryInfo','#related-posts','.after_disclaimer_placement',
    '.featured-carousel','.ad-disclaimer-container',
    '.react-content-related-container','#follow_our_work_inner','#articleRelated',
    '.not-quite-full-width-image-lede-text-above__byline','.translations',
    '.featuredslider','.relatedpopular','.detailcols-secondary',
    '#innercols-secondary','.ac-lre-player','.ac-lre-player-ph','.adElement',
    '.comments-block','.related-article-grid-container','#advertorial','.article-heading-v2__contributions',
    '.article-after-body',
    '.related-wrapper','.print-hide','.relatedContent-new',
    '.postDate','.postAuthorBox','.shareTrendingBox'
];

var toRemoveSelectors = [
    '.email-card',
    '.brand-logo-banner',
    '.preview-container','.newsletter-footer',//angel.co/blog/why-naval-ravikant-thinks-remote-work-is-the-future
    '.recent-news-block',//https://news.ucsc.edu/2019/07/plant-consciousness.html
];

var articleSelectors = [
                        '.blogContent',
                        '#Root .Post',//theintercept.com
                        'main.ContentPageBody-module__body__container',//spectator.co.uk
                        'main.article.content',//sunset.com
                        '.node__content',//fiercebiotech.com
                        'article #body-text',//cnn.com
                        'article .post-body',
                        'section[itemprop=articleBody]',//nytimes.com
                        'main article',
                        '#main .entry-content',
                        'article.feature-article',//bloomberg.com
                        '#artTabContent',
                        '#detail-body',
                        '#contentBody',
                        '.article_content',
                        '.contentUnitA01',
                        'main#main-content article',
                        '#main',
                        'article[itemprop=articleBody]',
                        '#articleBody',
                        '.story-type--core',//politico.com
                        '#mainbody .story',
                        '.node-body',//nfctimes
                        '#main-content',
                        '.c-post--article',//www.thegentlemansjournal.com
                        '.story-text',//www.politico.com/story/2019/07/03/republicans-white-house-budget-plan-1398306
                        '#article_text',//thefreelibrary.com
                        '._Content__',//firstround.com
                        'article.node-content-page',//chamonix.net
                        '#articleBodyContainer',//cnn.com
                        '.amp-wp-article',
                        '#root article',//medium
                        '.post-content',
                        '#storytext',//NPR
                        '#main.page',
                        '.storyBody .storyContent',
                        '#articlecontentonly',
                        'article.c-content',
                        '.cb-post__body',
                        '.item_body',//www.gamasutra.com
                        '#main .the-content',//thebulwark.com
                        'section.meteredContent[itemprop="articleBody"]',//NYT
                        '#story',
                        '.content article',
                        '#main-sidebar-container > #main',
                        '.site-main .entry-content',
                        '.post_content .post_article',//clien.net
                        'section>div>article',
                        '.articleBox .article-content',
                        'section.post-body',
                        '.post-content__body',
                        'ARTICLE.story',//NYTIMES
                        '.article.article-first-row',
                        '.post_article.fr-view',
                        '.article-content.blueprint',
                        '.amp-page-body',
                        '.story-element current',
                        '.blog-post__text',
                        '#content',
                        '.content-article',
                        '.storycontent',
                        '.l-article--blog',
                        '.wiki-content',
                        '.ArticleBody-articleBody',
                        '.page-container .tve_shortcode_rendered',
                        '.detailBody .story',
                        '.art-article',
                        '.rad-story-body',//nytimes.com
                        '.article-body',//put first before article-content for theatlantic.com/magazine
                        //'main',
                        '.post-body',
                        //'page-content-inside',
                        '.article-content',
                        '.td-post-text-content','.entry-content',

                        '.entryContent',
                        '.blog_post_container',
                        '.post-wrapper',
                        '.postArticle-content',
                        '.field-name-body',
                        '.content[itemprop=articleBody]'];

var keepCommentSpan = window.location.href.indexOf('epfl.ch/en/sondage') != -1;

const hiddenDIV_IDs = [
                       'article_footer',
                       'post_more_wrapper',
                       'RecircCarousel',
                       'template-container',
                       'google_image_div',
                       'our-newsletter',
                       'rev-flicker',
                       'article-tags',
                       'comp-pattern-library',
                       'the-comments',
                       'header',
                       'inline-newsletter_placeholder',
                       'comments-header','comment-paging','comments-closed',
                       'next-stories',
                       //'read_more_on','hot','whitepapers','sponlinks','spotlight',
                       'suggested-story',
                       'divMoreLanguages',
                       'navigation','aside',//www.i-cherubini.it/mauro/
                       'sidebar',//danshapiro.com/blog/2010/09/how-to-read-a-patent-in-60-second/
                       '_social_share',
                       //'sng_social_share2',
                       'related',
                       'Comments',//deanhume.com/Home/BlogPost/push-notifications-on-the-web---google-chrome/10128
                       'mobile-share-button',//googlesystem.blogspot.it/2013/10/new-google-image-search-for-mobile.html?m=1
                       'main-header','main-search',
                       'innertoc','footer',//quirksmode.org/blog/archives/2015/05/web_vs_native_l.html
                       'navbar','sidebarHelp','topBar','breadcrumb',
                       'comment_wrap',
                       'comments-tabs',
                       'toolbar-bottom','socialmedia',//news.stanford.edu/news/2015/march/new-admits-finaid-032715.html
                       'comments',//mjtsai.com/blog/2015/01/06/apples-software-quality-continued
                       'primaryaudio','story-meta',/*'mb_container',*/'weatherPanel','inner-sidebar','cover','blurbs'];

var lazyattributes = 'srcSet,data-native-src,data-srcset,data-low-res-src,data-raw-src,data-interchange,srcset,ng-src,data-src-small,data-src-xsmall,data-src-mini,data-anigif,data-src-mobile,datasrc,data-src,data-bg-image,data-original,data-mobile-src,data-image,data-src-small,src'.split(',');

const badImageURLs = [
                      'fbcdn.net',
                      'oovvuu.com',
                      'staticBackgroundImage',
                      '/avatars/picture',//author in nfctimes
                      'blog_bg.png',//gradient in nfctimes
                      'adn.lrb.co.uk',
                      'consent.google.com/status',
                      'medium.com/fit/c/96/',//medium author images
                      //'wp-content/themes/st_refresh/img/st-meta-',
                      's8t.teads.tv',
                      '/static/images/profiles',
                      'download-code-icon.png',
                      'ams1-ib.adnxs.com',
                      'img/loader',
                      'arrowu.gif',
                      'waita.gif','lload_banners/',
                      '.zkcdn.net/Advertisers',
                      'pattern-bg',
                      'assets/app-download',
                      'doubleclick.net','atpixelus.alephd.com','aolcdn.com/ads','casalemedia.com',
                      'pixel.wp.com','di.rlcdn.com','.sitescout.com',
                      'bat.bing.com',
                      'ad.doubleclick.net',
                      'hymnal-prod.vox-cdn.com',
                      'fee-logo-',
                      'amplifypixel.outbrain.com',
                      //'.imgix.net',
                      'tk0x1.com','loopme.me',
                      'carambo.la','doubleverify.com','pixel.watch',
                      //'media.licdn.com',
                      'omnitagjs.com',
                      'partner_uid','.taboola.com','.bluekai.com','ib-ibi.com',
                      'adCodeGenerator',
                      'content-holder.png',
                      //'.cloudfront.net',
                      '.adtech.','adserver',
                      'advertising','classifieds',
                      '.hwcdn.net',
                      '.unrulymedia.com',
                      '.freeskreen.com',
                      'template/author_generic.jpg',
                      'sumo.com',
                      'a.akamaihd.net',
                      '.postrelease.com',
                      'newsmaxfeednetwork.com',
                      'mgid.com',
                      'alicdn.com',
                      'admin/TEMPLATE',
                      //'.fbcdn.net',// no because there are valid images in https://ai.facebook.com/blog/online-speech-recognition-with-wav2letteranywhere/
                      'contextual.media.net',
                      '.googlesyndication.com',
                      '.360yield.com/',
                      'assets/images/hs/hstv-logo',
                      'bright-squares.png',
                      'assets/logos/forbes-logo-f.png',
                      'cdn-mobapi.bloomberg.com',
                      '.wibbitz.com',
                      '.advertserve.com',
                      'loader_2x_light.gif',
                      '/icons/',
                      'kdnuggets.com/aps/',
                      'interpolls.com',
                      'smTemplate/home/css',
                      '_carbon_banner.png',
                      'twistage.com',
                      'adServer','engine.widespace.com','.quantserve.com',
                      '/deleted_large.png',
                      'loading.gif',
                      '.google.com/ads/',
                      'texture-grain.',
                      '/enhanced-buzz-wide-',//buzzfeed dup images
                      'ced.sascdn.com',
                      '.openx.net',
                      'assets.pando.com/avatar',
                      '.monetate.net',
                      '.pubgears.com',
                      'canvas.tnwcdn.com',
                      '.googlesyndication.com',
                      'tumblr.com/avatar_',
                      'files/adv/',
                      'cloudfront.net/neutral_bg',
                      '/inshop/',
                      'logo.png','anti-ad-block-article-ad.jpg',
                      'RealMedia/ads',
                      '.rubiconproject.com',
                      '.criteo.com/delivery',
                      '.tuttogratis.it',
                      '.amazon-adsystem.com',
                      'rssing.com/inc/img',
                      'events/promos',
                      'files/sponsors',
                      'Banner_Ads',
                      'weather/backgrounds',
                      'openx.com',
                      'twimg.com/profile_images',
                      'gravatar.com/avatar/',
                      'play-icon.png',
                      'avatar.png',
                      'google.com/images/logos',
                      'wp-content/themes',
                      //'wp-content/plugins',//infrared5.com has valid header image
                      'adform.net/',
                      '.mediaplex.com'
                      ];

const KEEP_LOCAL_IFRAMES = true;

const PLAY_VIDEO = '<center>Play Video</center>';
const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
const vimeo_regexp = /video\/|http:\/\/vimeo\.com\//;
const dailymotion_regexp = /^.+dailymotion.com\/(video|embed\/video)\/([^_]+)[^#]*(#video=([^_&]+))?/;///^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;

const MIN_SVG = 58;
const MIN_WIDTH = 100;
const MIN_HEIGHT = 64;
const ASPECT_RATIO = 18;
const MIN_WIDTH_HEADER = 200;
const MIN_HEIGHT_HEADER = 64;
const wikiKeepAttributes = ['src','href','width','height','originalw','originalh'];
const old_keepAttributes = ['valign','class','id','src','href','width','height','original','originalw','originalh',
                      'readerhidden','videoposter','youtubeid',
                      'backimage','backimagewidth','backimageheight','replacedfromdiv'];
const keepAttributes = ['src','href','width','height','original','originalw','originalh','videoposter','youtubeid'];

const attributesToRemove = {
                            'itemprop':['author','sourceOrganization'],
                            'data-tracker-label':['story.contributor.headshot'],
                            'data-type':['note'],
                            'data-js':['articleTags'],//wired.com/2015/09/sorry-ello-real-anti-facebook-good-old-email/
                            'role':[/*'banner',*/'button','toolbar','complementary'],
                            'displaytext':[],
                            'data-about-syndication':[],
                            //'data-disqus-identifier':[],
                            'data-tracker-category':['nav','engagement','social','module'],
};

const exactClassNamesList = [
                             'shareTrendingBox',
                             'previous_blog',
                             'articleMeta',
                             'jp-relatedposts',
                             'revive-banner',
                             'InjectedEntryCard',//firstround.com
                             'graf-dropCap',
                             'w-author',
                             'connatix',
                             'cnx-hl-top-article','cnx-hl-readmore','cnx-hl-headline-container',
                             'admz',
                             'teases-list',//thebulwark.com
                             'bottom-of-article',//NYT
                             'author-images',
                             'post-author','dex-blog-post-summary',
                             'post_previous','post_next','sidebar',
                             'post_wrapper author',
                             'post_tag',
                             'widget','next-prev',
                             'chartbeat-story',
                             'adroll-block',
                             'postTags',
                             'l-sidebar',
                             'cne-interlude-container',
                             'c-recirc-content',
                             'no-caption',
                             'related-content',
                             'other-articles-table',
                             'entry-thumb','td-category',
                             'blog_meta_item',
                             'mobileOnly Ad',
                             'rev-header',
                             'rev-content','rev-flicker',
                             'tags','news-clip','external',
                             'navigation--footer','page__foot',
                             'p_contextMenu',
                             'amp-hidden',
                             //'external-link',//valid for https://www.wired.com/story/javascript-framework-puts-web-pages-diet/
                             'the-meta',
                             'home-link','single-sidebar',
                             'footer2',
                             'submeta',
                             'content__label__link',
                             'field-wrapper-title',
                             //'element-invisible','slide-menu-','button','option',
                             //'big',
                             'comment-count',
                             'progressive-image-thumbnail',
                             'cnevideo',
                             'news-related',
                             'avatar','twitter','facebook','related-stories','trending-posts',
                             'tablecontainer',
                             'ad__concert-link',
                             'total-qty','views',
                             'separator-heading','media-list',
                             'share-comment','author-about','article-republish-title','sub-heading article-date',
                             'subscription','row bio',
                             'related',
                             'concierge-post-link',
                             'wpp-list',
                             'block1 block','block2 block','block3 block','block4 block',
                             'orb-banner-title',
                             'excerpt-thumb',
                             'sharing__list',
                             'content-footer',
                             'zergheader','zergimg',
                             'icon-comments','entries-similar',
                             'riproduzione-riservata',
                             'intro ng-binding','name ng-binding',
                             'source',
                             'dropdown','menu-trigger','swiper-wrapper',
                             'p-breaker-head__wrapper',
                             'c-entry-box--compact__title',
                             'p-counter-link',
                             'comments','comment','comments-icon',
                             'menu-item--header',
                             'slug-component',
                             'feedb','print',
                             'app-link',
                             'auc-tutorial-share','auc-did-you-know','tutorial_bottom_information','auc-pod-small startingpoints','related-tutorials','sidebar-ask-the-community','btn_trial',
                             'nmHeaderTitle','nmWidgetUl',
                             'amp-wp-prefooter',
                             'dropdown-toggle','caution','actions','message footnote','kudos','stats',
                             'heading-large block-loose',
                             'header group header-main','section-nav',
                             'module-heading',
                             'promo-unit-wrapper',
                             'share-item',
                             'boxtop-most-popular',
                             'wptl btm',
                             'general_navigation',
                             'recirc__list','right-rail',
                             'post-categories','show-comments-btn',
                             'article-detail__byline-image',
                             'liste_connexe',
                             'read-next',
                             'entry-date','fbAdLink',
                             'amzn-native-products-list','amzn-native-brand-content','amzn-native-brand-text',
                             'full-width-image-lede-text-above__byline',
                             'sharing-btn__text',
                             'dealpost-mod promo',
                             'ad-header',
                             'block single-post-time',
                             'ad-below',
                             'inline-email-title-container','vortex-open',
                             'rwtforum-pages','rwtforum-post-comments','footer-widgets',
                             'author-info','authorimg','shortbio',
                             'read-more blox',
                             'nytg-chart',
                             'extra-content',
                             'article-tag','issue-article',
                             'meta amp-wp-meta',
                             'actualites-relatives',
                             'nothanks',
                             'signature',
                             'lede-text-only__byline','lede-text-only__attribution','lede-text-only__times','lede-media-video__caption',
                             'podcast-subscribe-menu','podcast-test',
                             'ctx-link','gallery-links',
                             'recirculation section',
                             'video-playlist-inline',
                             'slider-picks-wrapper','affiliate-box',
                             'republish-button','article__actions__buttons',
                             'social-sharing social-sharing--buttons','article__word-count',
                             'rich-link__header',
                             'us_share',
                             'Newsletter',
                             'article-topper__topic',
                             'ec-trafficdriverlink',
                             'article-footnote',
                             'ad-policy',
                             'share-box',
                             'callout__inner',
                             'read-more','article-topics','widget list-widget recommended-widget',
                             'adv_header','div_gpt_mpu_ad_container',
                             'caption-credit','slide-count',
                             'DivBlogComments',//
                             'share-article','tag-list','large-share-article','author-bio',//gearjunkie.com/trail-runner-suspended-blood-doping-utmb
                             'article-details--small','image__credit','article-source__author','article-source__source',
                             'cookie-policy',
                             'contrib-preview',
                             'category-bar cc',//sponsorizzato ilfattoquotidiano.it/2016/08/04
                             //'ng-scope',//(ng-scope useful in forbes.com),//sponsorizzato ilfattoquotidiano.it/2016/08/04
                             'entry-author',
                             'date-box','author-box',
                             'continue-reading','top-stories-heading','top-story-carousel',
                             'text-size-toggle','story-share-tools',
                             'article__share__print','article__share__comments',
                             'dipnot',//turkudostlari.net
                             'PostMeta-user',
                             'tag-data',
                             'pagi',
                             'reddit_btn',
                             'related-reading',
                             'article-share',
                             'amp-wp-tax-category','amp-wp-tax-tag',
                             'post-details','post-nav',
                             'article__body__author-details',
                             'postMetaInline','readingTime',
                             'shares',
                             'a-author','a-sidebar-content',
                             'u-hidden-text',
                             'el__storyhighlights','el__storyelement__gray',
                             'el-editorial-source',
                             'js-media__caption media__caption el__storyelement__title',
                             'extra',
                             'authors-names',
                             'm',
                             'most-recent',
                             'view-gallery-button','icon-loader','suggested-video',
                             'inline-media__credit',
                             'dt-ads-box',
                             'red-link',
                             'feed-footer',
                             'relatedArticle',
                             'share','nextstory',
                             'slider_teaser',
                             'partner-box',
                             //'img-content cleared',//nature.com/news/has-a-hungarian-physics-lab-found-a-fifth-force-of-nature-1.19957
                             'story-options',
                             'share-overlay-hdr',
                             'quicklinks','multilang slideUp','clickFinger',
                             'story-dateline','story-related','label-related',
                             'ContentFooter PostFooter',
                             //'js-media__video media__video',
                             'item author',
                             'news-disclaimer-text',
                             'abh_tabs',
                             'feedzy-rss',
                             'post-share',
                             //'content-container',//fails with weforum.org/agenda/2016/08/how-to-prepare-for-work-jobs-of-future/
                             'progress-bar',
                             'pb-caption',
                             'story-continued','widget-nav',//politico.com/story/2016/05/elon-musk-rocket-defense-223161
                             'C1',//mollyrocket.com/casey/stream_0029.html
                             'continue-holder',
                             'row related-media','theme-color-text strong pull-left',
                             'ac_header_title','ac_adbox',
                             'callout callout-notes',
                             //'embed-container',
                             'span9',
                             //'p1',
                             'meta-list','single-meta',
                             'footer-content',
                             'tools','search','menu','to-top',//theatlantic.com/photo/2016/05/the-massive-wildfire-burning-in-alberta/481611/?single_page=true
                             'author',
                             'textwidget',//theeconomiccollapseblog.com/
                             'grey','module_headline',//paloaltoonline.com/blogs/p/2016/05/01/abruzzo-for-work-amelia-for-family-rome-for-love
                             'IN-widget',//codeahoy.com/2016/04/30/do-experienced-programmers-use-google-frequently/
                             'signup-box',
                             'date timestamp-processed',
                             'd-fow-nav',//mobile.nytimes.com/2016/02/28/magazine/what-google-learned-from-its-quest-to-build-the-perfect-team.html
                             'd-headline','d-leadin',//nytimes.com/2016/04/26/science/victims-of-a-new-african-massacre-gorillas.html
                             'sharetools-video-container','video-link',//nytimes.com/2016/04/26/science/victims-of-a-new-african-massacre-gorillas.html
                             //'textwidget',//danshapiro.com/blog/2010/09/how-to-read-a-patent-in-60-second/
                             'spotlight',//slashgear.com/jibo-vs-echo-will-be-decided-with-developers-hearts-10430974/
                             //no need now we remove 'noscript' tags 'field-image',//popsci.com/edward-snowden-internet-is-broken
                             'software-likes','ss-icon ss-quote','side-count',//devpost.com/software/eyephone
                             'news-contrib','nb-comments',//boursorama.com/actualites
                             'cat1 hov','txt6','txt2','comnt','txt5','cat',//jamuura.com/blog/pawan-kumar-on-u-turn
                             'post-items','branding','arttime','blkartlist','rating-wrap','image-credit','buzz_source_links'];

const wholeClassNamesList = [
                             'covid-podcast-',
                             'postAuthorBox',
                             'cb-header_mobile',
                             'cb-makes-drawer-make',
                             'sharedaddy',
                             'related-topics',
                             'shortcodeGalleryWrapper',
                             'cns-ads-stage',
                             'ad-container',
                             'prev-next-',
                             'crayon-nums',
                             'cat-head','posts-list',
                             'wiki-home','wiki-links',
                             'fig-micronav__item','fig-content-metas',
                             'relatedList',
                             'instream-native-video',
                             'btn btn-','card-title','list-unstyled',
                             'articleComments',
                             'dock_card_content',
                             'RelatedCoverage',
                             'archive-item','related-news-','news-clip',
                             'p_spinner','p_accessibleHitArea',
                             'distinct-component-group',
                             'bbccom_slot','story-more',
                             //'hidden',
                             'share__title','share__tools','p_time','p_playerControls','navigation__heading','orb-banner-','group__title',
                             'medianet',
                             'widget-box','banner-container','site-footer',
                             'o-article_meta_bar__avatar',
                             'app-download-interstitial__',
                             'article_date','eng_top_ww_widget','related_list',
                             'Recirculation-',
                             'contributions__',
                             'node--promoted',
                            'discourse-',
                             'fa-comment',
                             'c-related-list',
                             'cne-video-',
                             'related-cne-video-component__',
                             'hawk-affiliate-',
                             'c-recirc-module',
                             'ArticleCard_',
                             'remaining-comments','total-comments','comment-badge','comment-time','commenter-name-wrapper','commenter-badges','commenter-title','message-holder',
                             'ayl-template',
                             'powered-by-','river-post',
                             'main-menu__',
                             'Footer__','news-box','news-relevant',
                             'FeatureAuthor__',
                             'footer-nav__list','menu menu-site','menu menu-global',
                             'meta-box__','related-stories__','related-story__','sub-listing__','email-newsletter_','caricature-list__','news-listing__',
                             'inset-left-component',
                             'block__title','al_rec_hor_item',
                             'article-card__','donate__card','topics-banner__',
                             'campaign_link_',
                             'comments-link',
                             'footer ',
                             'c-simple-link-list-stream__',
                             'lovecraft-widget-list',
                             'rrssb-',
                             'quicktabs_tabs',
                             'stco stco','stco__main',
                             'article-sidebar swappable',
                             'widget-title',
                             'gig-comments-','simple-news-list',
                             'widget-heading__title',
                             'recirc-most-popular',
                             'ob-widget-items-container',
                             'gbttn-',
                             'bfa-share-btn',
                             'audio-corner','audio-player',
                             'read-more__button',
                             'dnd-widget-wrapper','syndication-btn',
                             'sumome-share-client',
                             'a2a_kit',
                             'fbAdChoices','adnwMRectRoot',
                             'wp-volt-gal-embed-promo-mid-label',
                             'player-headline-','player-tease','player-l-playlist',
                             'box-ad ad','player-header-playlist associated',
                             'adWrapper  ad',
                             'article-mobile-ad',
                             'related-asset article',
                             'embed--contentlinks','editorial-story--title link-','body-el-link','ad-marketplace','body-el-hr standard-body-el-hr',
                             'js-takeover','body-ad','wide_header_section','wide_header_author','smcx-',
                             //'wp-volt-gal-embed-promo-',
                             'post__comments-',
                             //'parbase ',
                             'jw-controls ',
                             'follow-topics-banner__',
                             'Post Post--blog',
                             'Post-contact',
                             'author_and_date',
                             'ec-topic-widget',
                             'teaser-s','related-teaser','most-read off-canvas__content',
                             'author-credits','related-external__readmore',
                             'aside-banner',
                             'action_tout_',
                             'siderail__item',
                             'most-popular',
                             'share-widget',
                             'share-tools__service',
                             'fullbleed-playlist',
                             'spi-button',
                             'lig_txt_','lig_campaign_','lig_img_',
                             'author only-mobile cronaca',
                             'oembed-link-',
                             'js_related-module','author-bio__wrapper',
                             'article__light-signup',//ft.com/content/50bb4830-6a4c-11e6-ae5b-a7cc5dd5a28c
                             'alt_colour',
                             'postMetaHeader',
                             'article__image__caption',
                             'follow-button__',
                             'glyphicon',
                             'a-footer-share',
                             'celtra-',
                             'theplatform-video__',
                             'component-consumer-marketing',
                             'kl-share-icon',
                             'banner-box',
                             'inline-expand-image inline-icon',
                             'akamai-controls',
                             'vjs-error-display',
                             'midArticle_byLine',
                             'wired-author',//wired.com/2016/05/okcupid-study-reveals-perils-big-data-science/
                             'addtoany_share_',//paweltkaczyk.com/en/apple-innovations/
                             'el__leafmedia el__leafmedia--feature','el__leafmedia el__leafmedia--factbox',//edition.cnn.com/2016/05/16/politics/donald-trump-rough-few-days/
                             'fontello-',
                             'num-linked-startup',
                             'widget caste-exclusive',//politico.com/story/2016/05/elon-musk-rocket-defense-223161
                             'js-comment-count','sticky-tools__button',
                             'meta__avatar','meta__data',//http://lifehacker.com/5841747/the-best-pdf-viewereditor-for-mac
                             'sharify-container',
                             'cookie-choices-',
                             'embed h2','best-reads-list',
                             'callout inset-related',
                             'inlineNextArticles','mrf-title mrf-moreIn',
                             'widget cf ',
                             'share-container',
                             'module module-',//theatlantic.com/photo/2016/05/the-massive-wildfire-burning-in-alberta/481611/?single_page=true
                             'shareaholic',
                             'ssba ssba-wrap',
                             'shadow comment',//paloaltoonline.com/blogs/p/2016/05/01/abruzzo-for-work-amelia-for-family-rome-for-love
                             //'block scfw-2 scfw',//danshapiro.com/blog/2010/09/how-to-read-a-patent-in-60-second/
                             'teads-ui-components-',//salon.com/2016/04/10/
                             'share-tooltip','article-reprintsLink','article-grid__aux',//scientificamerican.com/article/eye-tracking-software-may-reveal-autism-and-other-brain-disorders/
                             'story-supplement','widget-content read-more-content',//politico.com/magazine/story/2016/01/donald-trump-2016-authoritarian-213533
                             'trb_ar_by',//latimes.com/business/technology/la-fi-tn-apple-next-steps-20160330-story.html
                             'share-bar','btn-comment-goto',
                             'view-comments',
                             'article-gallery-embedded',
                             'cta__text','segment segment--short','segment clearfix',
                             'sub_buzz_source_via buzz_attribution','expand action-bar__btn-subbuzz','grid_cell_image_wrapper',/*'lazy ',*/
                             'svg-icon',
                             'more-widget',
                             'story_author','story_pubdate',
                             'mashsb-container','single-post-date','post-tagged',
                             'stuff-box',
                             'interstitial-link','sign-up ','moat-trackable',
                             'article-subtitle','article-author','inter-article-nav-header','boxed-header','prev','next',
                             'margin-top','ooyala-video-player',
                             'story-info','modal-footer','modal registration-modal',
                             'pm-meta-bar',
                             'share-panel','explanation',//'subscribe',
                             'monetate ','shopnationWidget','slide lastSlide','nextSlideshow',
                             'gigyaShare','slideOfTotal',
                             //'dnd-widget-wrapper',
                             'gig-bar-container','taboola',
                             'text-resizer',
                             'submitted','taxonomy','blog_usernames_blog',
                             'l-postSingle-header',
                             'boton_ampliar','autor','autor-texto','autor-perfiles',//elpais
                             'fa fa-play','stack-cta-video-duration','js-play-video img-caption',
                             //'col-sm-12',// fails on jamuura.com/blog/pawan-kumar-on-u-turn
                             'first_published_at','quicktake_footer','writers','editors','quicktake_recirc','quicktake_tile',
                             'widget video default','aside lt_track','article__ontwitter',
                             'story-image-text image-credit',
                             'oembed oembed-usa-today',
                             'date-stamp',
                             'ArticleCategory','Identity_plate','ArticleContextInformation','ArticleHistory','MainTitleSection',//scfbm.biomedcentral.com
                             'meta pull','pull-right meta','insert-right',
                             'info','top',//remove because makes fail http://www.bbc.com/travel/story/20160309-the-empire-the-world-forgot
                             'sosyal_buton','breadcrumbs','yazi-bilgi','etiketler',/*'related',*/'tarih',
                             'node-metainfo','datePublished','fb-comments-',
                             'share-server-container',
                             'featured videos yt',
                             'cats','auth-bio clearfix','navigation clearfix','timeline-footer',
                             'meta-comments','meta single','meta-author','meta-date',
                             'tumblr-notes',
                             'pagination','story inset_clone',
                             //'zonedModule',messes up wjs.com
                             'vrideo__',
                             'g-artBoard',
                             'newssubheader',
                             'card2 ',
                             'wp-loading ',
                             'c-newsletter-context',
                             'post_categories','post_author_image','post_author_metas','post_error_reporter','newest-next-post',
                             'td-post-comments','mejs-controls',
                             'enlargebtn',
                             //'meta',//removed because mobile.nytimes.com/2015/12/03/technology/transformation-at-yahoo-foiled-by-its-leaders-inability-to-bet-the-farm.html
                             'feedback',
                             //'comment',
                             'facebook-count','newsfeed',
                             'vhs-metadata-container','video-spacer','videoholder proportion-image','asset-title',//nytimes.com videos
                             'review-information',
                             'row-item',
                             'view-options','slide-more-','slider-arr',
                             'item-carousel','six-column','comment-count-',
                             'small-title',
                             'inArticleRelatedList',
                             'snap_nopreview',
                             'callout-',
                             'single-thumbnail-info',
                             'corrections','tag-cloud',
                             'lia-message-author','KudosButton',//developerboards.att.lithium.com/t5/AT-T-Developer-Program
                             'content streaming','next-article',//mirror.co.uk/news/world-news/roubaix-several-wounded-hostages-taken-6893497
                             'subscribe-container',
                             'article-tools',

                             //'image-credit',//removed because mirror.co.uk/news/world-news/roubaix-several-wounded-hostages-taken-6893497
                             'credit',
                             'article-hot-topics',
                             'comment-holder','load-comments','email-signup',
                             'ap-holder',//entrepreneur.com
                             'story_info','subheader top_subheader',
                             'crp_related',
                             'post-report-link',
                             'brandconnect-',
                             'controls',
                             //'slideshow slideshowify fullscreen',//techcrunch.com/2015/11/20/facebook-at-work-gets-its-own-version-of-messenger-with-debut-of-work-chat/
                             'updated','slike','linkwithin_',
                             'widget_text widget sidebar-background',
                             'canvasAd',
                             'native-ad-mobile',
                             //'slideshow',//ft.com/cms/s/2/f6653b82-4023-11e5-9abe-5b335da3a90e.html#slide4
                             'dd_post_share','IN-',
                             'post_info',
                             'butt-pin',
                             'post-date',
                             'ad_slug_table',
                             'overlay-icon mobile-gallery',
                             'unit__',
                             //'story-body__link',messes up http://www.bbc.com/news/technology-19734341
                             'published',
                             'card-stats',
                             'avatar-image',//medium
                             'osd-sms-wrapper',
                             'vjs-control',
                             'video-length',
                             'previously',
                             'nextPost',
                             //'source',//fails on http://coupsdecrayons.blogs.sciencesetavenir.fr/apps
                             'terminal-tout',
                             'video-play-button','t_callout',
                             //'gallery',
                             'older-entries','newer-entries','section-titre',//'pagination',
                             'sponsored-content',
                             'comment-button',
                             'marker','single-author',
                             //'carousel',
                             //'thumbnail',
                             'carouselWrapper','video-poster-title-',
                             'interactive-overlay','g-artboard',//nytimes
                             'nowid',//blog.edmodo
                             'link insidemenu',
                             'related-promo',
                             'post-links',
                             'pib-count-table','pin-it-btn',
                             'text-center title-xs',//bfmbusiness.bfmtv.com/entreprise/save-le-sauveteur...
                             'articleShare-','tweet tooltip','l-postSingle-content-main-related',
                             'progressiveMedia-thumbnail',//medium.com/@arikaleph/facebook-m-the-anti-turing-test-74c5af19987c
                             'contentheading',
                             'konafilter','createdate','bannergroup','minifp','modifydate',
                             'leave-comment',
                             'fact-box widget--small','asset-fact-box ',//fokus.dn.se/edward-snowden-english
                             'after-article',//qz.com
                             'buttons','popout',
                             'article-footer','post-footer',//blogspot.it
                             //'comments',
                             'by-line','article-line','associated-container',
                             'postmetadata',
                             //'slick-track',
                             'shortcode related-links',
                             'article-inset-related',
                             'incontentAd',
                             'confab',
                             'ShareContainer',
                             'ai-com',
                             'news-date-article',
                             'attribution','zergnet-mobile-tiles','article-body-recirc tile',
                             'right-edge-wrap','ad-wrapper',
                             'ad_container_body','promo_link','bookmarking_wrapper',
                             'yarpp-related',
                             'publishdate',
                             'sharebuttons',
                             'wpa wpmrec',
                             'linkback','text-muted',
                             'ym ym_format',
                             'asset_relatedlinks','asset-player ndn',
                             'modal-trigger',
                             'story-image-copyright',
                             'inline-content inline-video',
                             //'posttv-video-embed',
                             //'ptv-promo-info',
                             'article-native-ad','vestpocket','article-print-bar',//forbes.com/sites/alexkonrad/2014/12/01/ex-googlers-help-old-bosses-beat-microsoft/
                             'field field-name-field-now-read-this',//stuff.tv/features/when-dev-dies-their-apps-should-live
                             'breakingtxt','relatedstories','articlecomment','breadcrumb','article_outer ','timeformat',//timesofindia.com/tech/tech-news/Just-say-no-to-Facebooks-Internet-org-says-inventor-of-World-Wide-Web/articleshow/49257003.cms
                             'commenttitle','commentmeta','comment-text',//blogs.law.harvard.edu/philg/2015/10/10/ad-blocking-a-sign-that-web-publishers-dont-care-about-readers/
                             'ad-article-breaker-text','module module-story-list',//popularmechanics.com/space/rockets/a17574/masten-space-systems/
                             //'meta-footer-dig',
                             'AW-Form-',
                             'date updated','metadata',//law.harvard.edu/doc/2015/09/28/beyond-ad-blocking-the-biggest-boycott-in-human-history/
                             //'clearfix',//wrong to put this one
                             'ember-view topic-map','badge badge-notification','topic-meta-data',//meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889
                             'off-screen',
                             'visually-hidden',
                             'recommendations-nest__main',//bbc.com/news/technology-34143171
                             'rich-link__read-more',
                             'story-body__mini-info-list-and-share',//bbc.com/news/world-europe-34243967
                             'rel-block-sec','ad_below_text','ad_text_small','article-links',//thehindu.com
                             'ArticleHead_meta','Author','Sharer','ArticleHead_supplemental',//sitepoint.com/speed-index-measuring-page-load-time-different-way/
                             'story-package','thumbnail-carousel',//ft.com/cms/s/2/f6653b82-4023-11e5-9abe-5b335da3a90e.html#slide4
                             'summary-text','tools-wrapper',//nyt
                             'notesMarkers','postMetaInline-','voteWidget','promo-cell',//medium
                             'publication-date',
                             'meta-data','post-meta',
                             'timestamp',//m.huffpost.com/us/entry/7971368
                             'm-article__sources',//theverge.com/2015/8/12/9141699/periscope
                             'more',// dailymail.co.uk
                             'dateline'//marketingland.com/google-alphabet-138166
                             ];
//const anypositionList = [];
const anypositionList = [
                         'advertise-with-us',
                         'panel-related',
                         'c-related--posts',
                         'image-viewer_imagePreload',
                         'region-content-footer',
                         'global-app-bar','list-recommender','video-playlist',
                         '-newsletter-promo','-author-bio','article-comments',
                         '-related-content','mini-footer-panel',
                         //'fa-comment','node--promoted','node--related','node--sticky',
                         '_reuse-button','-link-subscribe','latest-updates-panel__','navigation__main-navigation-link','blog-post__section-link',
                         'component-most-popular','-video-sidebar','sponsored-features-sidebar',
                         'js-related-articles',
                         'author-img--mobile',
                         //'category-links', fails for blogs.harvard.edu
                         'nav-menu',
                         'kudo able',
                         'image-caption-attribution','article-author-bio','sidebar-subscribe',
                         '__related-stories-',
                         'most-popular-box','hide-on-mobile','block-ad-mobile','content-box-container content-block',
                         'share-count-container',
                         'video-bar associated',
                         '-app-promo-card',
                         'block-ec_ads','-read-more-box',
                         'suggested-reading',
                         'ssbp',
                         'top-comment top-comment-link',
                         'text parbase section',
                         'dpsp-networks-btns-wrapper',
                         'inline-icon',
                         'module-most-popular',//politico.com/magazine/story/2016/01/donald-trump-2016-authoritarian-213533
                         'gal txt_hover',//jamuura.com/blog/pawan-kumar-on-u-turn
                         'theme-interactive','sponsored-by-revcontent'];

const classNamesList = [
                        'inline-pipes-list',
                        'slideshow-fullscreen-handle','slideshow-info-container',
                        'video-play-btn',
                        //'_shares',
                        'c-newsletter-story-footer',
                        //'share-',
                        //'-share',//some images have this class

                        'inShare',
                        'fmvps-player',//m.huffpost.com/us/entry/7971368
                        'btn-comment-goto',//economist.com/news/united-states/21660546-why-las-vegas-has-coped-well-drought-so-far-concrete-oasis
                        'article-more-feed-container',//engadget.com/2015/08/04/self-driving-car-web-game/
                        /*'more',*/'social top',//dailymail.co.uk
                        'linkedInShareButton',//apptamin.com/blog/get-funding-mobile-app/
                        'pane-hp-more-articles','initFancyBox','print_html','pane-node-comment-form','comments-count',
                        'vote_and_share',
                        'expandyRowHolder',//wired.co.uk/magazine/archive/2015/03/features/messaging-apps
                        'blog-feedback',//msdn.com/b/ie/archive/2014/10/27/bringing-interoperable-real
                        'notes-wrapper',//blog.instapaper.com/post/3208433429
                        'ad-placement',
                        'really_simple_share',// fitnesstreats.com/2011
                        'author-follow-button',// thenextweb.com/insider/
                        'vjs-time-controls',//theguardian.com/technology
                        'pw-widget',//smithsonianmag.com/science-nature
                        'ad articlebig',//mobile.nytimes.com/2015
                        'embedded-recirc--container',//popularmechanics.com/technology/
                        'link-box-list',//bbc.com/future/
                        '-sharing','__meta',//ted.com/talks
                        'post-tags',//blog.twitter.com/2015
                        'meta-avatar',
                        'wp_related_',
                        'ctx-nodefs','item-thumbnail-href','thumbBlock','item-label-href','trc_rbox_header_span',//cultofmac.com/309156
                        'dsq-','dsq_comment',//disqus.com
                        //'toolbar',//mobile.lemonde.fr
                        'the-author','icon-print',//dirtragmag.com
                        'gallery-caption','gallery-photocount',//edition.cnn.com/2015
                        'addthis','blog-author','follow-appeal',//rawstory.com/rs/2015/01/reza-aslan
                        'av-social-',//giallozafferano.it
                        'article-tags','ctx-module-',//modernfarmer.com/2014
                        'source-promos',//linkedin.com/pulse
                        /*'banner',*/'outbrain','also-on-wired',//wired.com/2015/01 (removed banner because techcrunch.com/2015/02/26/mo)
                        //'dateline',//washingtonpost.com/world
                        'noprint',//www.futura-sciences
                        'menu-navigation',/*'single-info',*/'slider-left-cat',//anonhq.com
                        'credit-bar',//news.yahoo.com
                        'gallery-thumbs','esi-gallery-nav','slide-counter','articleShareBar',//independent.co.uk
                        //'author',//liberation.fr
                        'mobile-ads',//techcrunch.com/2011
                        'overlay-caption',//bigstory.ap.org
                        'related_post',//appmarketinglab.com
                        '-related-article',//recode.net/2015
                        'm-linkset',//theverge.com/2015
                        'by-authors','share vertical',//nymag.com/scienceofus
                        'photo-count','article_toolbar',//bigstory.ap.org
                        'textAd','media-object-rich-text',//wsj.com/articles
                        'follow-story','further-information','extra-information',//cir.ca
                        '-relatedposts','screen-reader-','post-info','more-link','-timestamp','article-meta','contributer',
                        'OUTBRAIN','metabar','fb-like','tweet-','nr_related_placeholder','entry-meta','author_date',/*'promo','aside',*/
                        'ad-unit','next-story','article-related',/*'byline',*/'author-meta','cookie-notice','credit-caption','bookmarks','socialshare','image-enlarge','p-entry-header__','relatedContent','flare','social-bar','sharedaddy','pagetags','sharepost','fb-share','twitter-share','followme',
                        'billboard',//netsecurity.about.com/od/newsandeditorial1/a/Facebook-Security-5-Things-You-Should-Never-Post-On-Facebook.htm
                        'tt-wrapper','tablet-ad',//slate.com/articles/business/the_juice/2015/07/solarcity
                        'header-login','header-bar',
                        'floater','sponsors',//quirksmode.org/blog/archives/2015/05/web_vs_native_l.html
                        'selectMenu','blockSubtitle','navbar',
                        'social',
                        'shoutout',
                        'tags',
                        'table-of-contents',//superpowered.com/androidaudiopathlatency/#axzz3XVHuH8ux
                        'gallery gallery-ready',//bikeradar.com/mtb/gear/category/bikes
                        'sharing-options','post-page-thumbnail',//chriskranky.com/microsoft-spartan/
                        'post-index-meta',/*'category',*//*'author',*/'side-menu','content-excerpt',//psfk.com/2015/03/algramo-vending-machines-food-staples-feeds-the-poor.html#.VRVuVCCfTVo.twitter
                        'sharesComments',//wired.co.uk/magazine/archive/2015/03/features/messaging-apps
                        'post-header-info','essb_links_list',//class-central.com/report/why-my-mooc-is-not-built-on-video/
                        'post-actions',//msdn.com/b/ie/archive/2014/10/27/bringing-interoperable-real
                        'comment-respond','commentlist','related clearfix',//9to5mac.com/2015/03/25/fantastical-2-mac/
                        'commentbar','votio',//ajaxian.com/archives/string
                        'idc','ele-share',
                        'm video-ct','social-count',//foxnews.com/politics
                        'post_buttons','share row','social_buttons','text-promo',//cointelegraph.com
                        'entry-posted','entry-comments','vcard',
                        'article-header-credit','date-header','narratives','related-posts','yellow-link','article-author-name','conheader','bucket img',
                        'container small',
                        'bucketblock','byline-content','byline','control-panel','post-attributes','post-author','updates-box','author-info',/*'sharing',*/'toolbar','infos'];

function getJsonFromUrl(location) {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
                             var item = part.split("=");
                             result[item[0]] = mydecode(item[1]);
                             });
    return result;
}

function getRules() {
    var rulesList = [];
    searchStyleSheets(rulesList);
    return rulesList;
}
function searchStyleSheets(rulesList) {
    try {
        var styleSheets = document.styleSheets || [];
        for (var i = 0; i < styleSheets.length; i++) {
            // CSSStyleSheet
            searchRulesList(styleSheets[i], undefined, undefined, undefined, rulesList);
        }
    } catch (erules) { return [];}
}
function searchRulesList(styleSheet, href, media, rules, rulesList) {
    // CSSRuleList
    var rules = rules || styleSheet.rules || styleSheet.cssRules || [];
    var href = href || styleSheet.href || '';
    var media = media || styleSheet.media.mediaText || '';
    for (var i = 0; i < rules.length; i++) {
        addRule(rules[i], href, media, rulesList);
    }
}
function addRule(rule, href, media, rulesList) {
    // CSSMediaRule
    if (rule.type === 4) {
        var rules = rule.rules || rule.cssRules || [];
        var href = rule.parentStyleSheet.href || '';
        var media = rule.media.mediaText || '';
        searchRulesList(rule, href, media, rules, rulesList);
    } else {
        // CSSStyleRule
        if (media=='print')
        {
            rulesList.push({
                           'selector' : rule.selectorText,
                           'css'      : cssTextToObject(getCssText(rule), rule),
                           'href'     : href,
                           //'self'   : rule,
                           'media'    : media,
                           'type'     : rule.type
                           });
        }
    }
}
function getCssText(rule) {
    return (function(text) {
            return text.substr(text.indexOf('{')) ;
            }(rule.cssText ? rule.cssText : rule.style.cssText));
}
function cssTextToObject(cssText, rule) {
    var m = cssText.match(/^\{(?:[ ]*)?(.*)(?:[ ]*)?\}$/);
    if (m != null) {
        var obj = {};
        if (m.length === 2) {
            var properties = m[1].split(/(?:[ ]*)?[;](?:[ ]*)?/);
            for (var i = 0; i < properties.length; i++) {
                var pair = properties[i].split(/(?:[ ]*)?[:](?:[ ]*)?/);
                if (pair.length === 2) {
                    if (pair[0]=='display' && pair[1].indexOf('none')!=-1)
                        obj[pair[0]] = pair[1];
                    if (pair[0]=='visibility' && pair[1].indexOf('hidden')!=-1)
                        obj[pair[0]] = pair[1];
                }
            }
        }
        return obj;
    } else {
        return cssText;
    }
}

function getHiddenPrint()
{
    var list = [];
    var rules = getRules();
    for (var i=0;i<rules.length;i++)
    {
        if (rules[i].css.display || rules[i].css.visibility)
        {
            if (rules[i].selector.indexOf('body')==-1)//2.1 for thehindu.com article
                list.push(rules[i].selector);
        }
    }
    return list.join(',');
}

var removeText = 'publicité,see also,adchoices,related articles,related stories,from our sponsor,prev,next,sponsored,more from business insider,recommended for you,popular posts,ads by revcontent,related topics,read full article,continue reading below,sponsored stories,share article,getty images,keep reading,share this post,a | a,related video,article image,sponsored links:,facebook comments,tags:,photo,by,comment,ap photo,also read:,you must enable javascript to watch this video!,now watch:,see also:,related:,links,rss feed,archives,share,comments,shop ▾,leave a comment,ads by rubicon project,share and enjoy,on,via,read more,tagged with:,add your comment,print,feedback,your feedback,advertisement,advertisements,media caption,caption,permalink,like this:,related'.split(',');

LoloAction.prototype = {

removeNodeText: function (div) {
    var elems = div.childNodes;
    for (var i=0;i<elems.length;i++)
    {
        var node = elems[i];
        if (node.nodeType === 3)
        {
            let text = node.textContent.trim().toLowerCase();
            if (removeText.indexOf(text) !== -1)
            {
                node.parentNode.removeChild(node);
                i--;
            }
            else if (text.match(/^\s?\S\s?\d+\s+min(utes)?\s+read/g)) // "- 30 min read"
            {
                node.parentNode.removeChild(node);
                i--;
            }
        }
        else
            this.removeNodeText(node);
    }
},

/*removeSimilarImages: function (div)
{
    var images = div.getElementsByTagName('img');
    var links = [];
    for (var i=0;i<images.length;i++)
    {
        var src =images[i].src;
        var url = new URL(src);
        var n = url.href.split('?')[0];
        if (links.indexOf(n))
        {
            images[i].parentNode.removeChild(images[i]);
            i--;
        }
        else
        {
            links.push(n);
        }
    }

},*/

unwrapLongBlockQuotes: function (div)
{
    try {
        var elems = div.querySelectorAll('blockquote');
        elems.forEach(e => {
                      if (e.textContent.length > 500)
                      e.outerHTML = e.innerHTML;
                      });
    } catch (ewrap) {}
},

makeBlockImages: function (div)
{
    //https://miro.medium.com/max/700/0*cc_31-Ko0Pe6Rw76
    //https://miro.medium.com/freeze/max/60/1*lyCJriyEIb9hHKVQcP8P0A.gif
    var imgs = div.querySelectorAll('img');
    imgs.forEach(img => {
        if (img.src.indexOf('medium.com/freeze/max/60') !== -1)
            img.src = img.src.replace('medium.com/freeze/max/60','medium.com/max/700');
        if (img.src.indexOf('medium.com/max/60/' !== -1))
            img.src = img.src.replace('medium.com/max/60/','medium.com/max/700/')
        if (img.src.indexOf('medium.com/max/60'))
            img.src = img.src.replace('medium.com/max/60/','medium.com/max/700/');
        let idx = img.src.indexOf('?q=');
        if (idx > 0)
            img.src = img.src.substring(0,idx);
        //else
        //    img.src = 'https://www.google.com/logos/google.jpg';
    });
    /*var images = div.getElementsByTagName('img');
    for (var i=0;i<images.length;i++)
    {
        if (images[i].width && images[i].width > 250)
            images[i].className = 'blockimage';
    }*/
},

sameImageURL: function (url1,url2)
{
    if (url1.indexOf('data:')==0 || url2.indexOf('data:')==0)
        return false;
    try {
        var u1 = new URL(url1);
        var u2 = new URL(url2);
        // http://chrisdodds.net/blog/vmwares-cloud-adventure
        if (url1.replace(u1.search,'') == url2.replace(u2.search,''))
            return true;
    } catch (eurl) { return false; }
    return (url1.replace(/-?\d+x\d+/g,'') == url2.replace(/-?\d+x\d+/g,''));
},

removePrintMedia: function (div){
    var hiddenSelectors = getHiddenPrint();
    if (hiddenSelectors && hiddenSelectors.length>0)
    {
        var hidden = div.querySelectorAll(hiddenSelectors);
        for (var i=0;i<hidden.length;)
        {
            if (hidden[i] && hidden[i].parentNode)
            {
                if (hidden[i].getElementsByTagName('IMG').length>0 || hidden[i].tagName =='IMG')
                    i++;
                else
                {
                    hidden[i].parentNode.removeChild(hidden[i]);
                    //hidden[i].setAttribute('csshidden',true);
                    //i++;
                }
            }
            else
                i++;
        }
    }
},

getQueryParam: function(param,url) {
    var result =  url.match(new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)"));
    return result ? result[3] : false;
},

removeAttribute:function(name,div)
    {
        var elements = div.getElementsByTagName('*');
        for (var i=0;i<elements.length;i++)
        {
            elements[i].removeAttribute(name);
        }
    },

removeIdAttribute:function(tagName,div)
    {
        var _skip_div_with_id = [//'sharing',//ted.com/talks
                                 'comment_wrap',//pinkbike.com/news/strength
                              'article-tags',//wired.com/2015/01/leap
                              'more-in-cat',//collectorsweekly.com
                              'topic-and-date','citation-show-button',//cir.ca
                                 'respond',/*'-socialbar',*/'fb-root','profile','frbanner', 'comment',/*'sidebar',*/'footer','feeds'];

        var elems = div.getElementsByTagName(tagName);
        for (var i=0;i<elems.length;i++)
        {
            if (elems[i].hasAttribute('id'))
            {
                var id = elems[i].id;
                elems[i].removeAttribute('id');
                for (var j=0;j<_skip_div_with_id.length;j++)
                {
                    if (_skip_div_with_id.indexOf(id) == 0)
                    {
                        elems[i].parentNode.removeChild(elems[i]);
                        i--;
                        break;
                    }
                }
            }
        }
    },

removeAllAttributes:function(tagName,body,list)
    {
        var attributesToKeep = null;
        if (list)
            attributesToKeep = list;
        else
            attributesToKeep = keepAttributes;
        var elems = body.querySelectorAll(tagName);
        for (var i=0;i<elems.length;i++)
        {
            if (elems[i].tagName === 'svg' || elems[i].tagName === 'SVG')
              continue;
            var attributes = elems[i].attributes;
            for (var a=0;a<attributes.length;)
            {
                var name = attributes[a].name;
                if (name && attributesToKeep.indexOf(name) == -1)
                    elems[i].removeAttribute(name);
                else
                    a++;
            }
        }
    },

keepImageByUrl: function(src) {
    if (!src)
        return false;
    if (src.length < 2)
        return false;
    for (let i=0;i<badImageURLs.length;i++)
    {
        if (src.indexOf(badImageURLs[i]) !== -1)
            return false;
    }
    if (src.indexOf('sprite')!=-1 && src.indexOf('.png')!=-1)
        return false;
    else
        return true;
},

youtubeID: function (src) {
    //return 'WXuCcZJ72ps';
    var prefix = 'img.youtube.com/vi/';
    var i = src.indexOf(prefix);
    if (i == -1)
        return null;
    var trail = src.substring(i+prefix.length);
    i  = trail.indexOf('/');
    if (i==-1)
        return null;
    else
        return trail.substring(0,i);

},

replaceDIVBackgroundImages: function (tagname,elem) {
    var divs = elem.getElementsByTagName(tagname);
    for (var i=0;i<divs.length;i++)
    {
        if (divs[i].hasAttribute('backimage'))
        {
            //var w = divs[i].getAttribute('backimagewidth');
            //var h = divs[i].getAttribute('backimageheight');

            var img = document.createElement('img');
            img.src = divs[i].getAttribute('backimage');
            var yt = this.youtubeID(img.src);
            img.setAttribute('youtubeid',yt);
            //divs[i].removeAttribute('backimage');//TODO
            img.setAttribute('replacedfromdiv',true);
            img.width = 320;
            //img.height = h;
            //2.1 don't remove the DIV as it might have text content
            // like in http://www.thehindu.com/todays-paper/tp-opinion/its-not-the-chinese-economy-thats-in-crisis/article7656702.ece
            // works with Medium page too (see 1.9 below)
            //divs[i].parentNode.insertBefore(img,divs[i]);
            /*if (divs[i].textContent.length < 32)
            {
                divs[i].parentNode.replaceChild(img,divs[i]);
                i--;
            }
            else*/
            {
                divs[i].parentNode.insertBefore(img,divs[i]);
                divs[i].backgroundImage = '';//2.1 but remove the image
                divs[i].removeAttribute('backimage');
                divs[i].removeAttribute('backimagewidth');
                divs[i].removeAttribute('backimageheight');
            }
            // 1.9: remove the DIV if we have the image otherwise PLAY icon over all images in Medium articles
            //divs[i].parentNode.replaceChild(img,divs[i]);
            //i--;
        }
    }

},


getLazySrc: function(elem) {
    if (!elem)
      return null;
    for (var i=0;i<lazyattributes.length;i++)
    {
        if (elem.hasAttribute(lazyattributes[i]))
        {
            var v = elem.getAttribute(lazyattributes[i]);
            if (v > '' && (lazyattributes[i].indexOf('srcset') !== -1 || lazyattributes[i].indexOf('srcSet') !== -1) && v.indexOf('data:') === -1) //m.spiegel.de has data: in srcset
            {
                // in https://www.apple.com/newsroom/2020/03/apple-u the srcset had newlines
                let res = v.trim().split(' ')[0].replace(/\s+/,'');//4.1
                if (res.charAt(res.length-1) === ',')
                  res = res.substring(0,res.length-1);
                return res;
            }
            else if (lazyattributes[i] === 'data-interchange')
            {
                return v.split('[')[1].split(',')[0];//http://www.spiegel.de/international/tomorrow/a-1093371.html
            }
            else if (v.indexOf('data:') === -1)
                return elem.getAttribute(lazyattributes[i]);
        }
    }

    //else if (elem.hasAttribute('data-ima-url'))
    //    return elem.getAttribute('data-ima-url');

    if (elem.hasAttribute('data-pattern'))
    {
        var widths = elem.getAttribute('data-widths');
        if (widths)
        {
            this.decoderdiv.innerHTML = widths;
            var obj = JSON.parse(this.decoderdiv.innerText);
            return this.lazyLoader(elem.getAttribute('data-pattern'),obj);
        }
    }
    if (elem.hasAttribute('data-lazy-src'))
    {

        var s = elem.getAttribute('data-lazy-src');
        var i = s.indexOf(' ');
        if (i>=0)
            return s.substring(0,i);
        else
            return s;
    }
    return null;
},

getMetaImages: function () {
    var metaTags=document.getElementsByTagName("meta");

    var res = [];
    for (var i = 0; i < metaTags.length; i++)
    {
        if (metaTags[i].getAttribute("property") !== null && metaTags[i].getAttribute("property").indexOf(':image') !== -1)
        {
            var src = metaTags[i].getAttribute("content");
            if (src && src > '' && this.keepImageByUrl(src))
            {
                try {
                    res.push({src:new URL(src).href,top:0});
                }
                catch (eurl) {}
            }
        }
    }
    return res;
},

markDIVBackgroundImages: function (tagname,elem){
    var divs = elem.getElementsByTagName(tagname);
    for (var i=0;i<divs.length;i++)
    {
        var rect = divs[i].getBoundingClientRect();
        if (rect.width >= MIN_WIDTH && rect.height >= MIN_HEIGHT && this.goodAspectRatio(rect.width,rect.height))
        {
            var src = this.getLazySrc(divs[i]);
            if (!src)
                src = this.getBackgroundImage(divs[i]);
            if (src && this.keepImageByUrl(src) && src.indexOf('data:') !== 0) // make sure we don't have data png in there (from DIV Ads)
            {
                divs[i].setAttribute('backimage',src);
                divs[i].setAttribute('backimagewidth',rect.width);
                divs[i].setAttribute('backimageheight',rect.height);
            }
        }
    }
},

/*removeNoFollow: function (div) {
    return;
    var links = div.getElementsByTagName('a');
    for (var i=0;i<links.length;)
    {
        var rel = links[i].getAttribute('rel');
        if (rel && rel=='nofollow')
            links[i].parentNode.removeChild(links[i]);
        else
            i++;
    }
},*/

removeEmptyLinks: function (div) {
 var links = div.getElementsByTagName('a');
 for (var i=0;i<links.length;)
 {
     var name = links[i].getAttribute('name');
     if ((name && name.indexOf('#')===0) || (links[i].href && links[i].href>0 && links[i].href.indexOf('#')>0 && links[i].href.indexOf(window.location) != -1))// && links[i].textContent.trim().length===0)
        //links[i].parentNode.removeChild(links[i]);
         links[i].outerHTML = links[i].innerHTML;//parentNode.removeChild(links[i]);
     else
        i++;
 }
},

removeEmptyTables: function (div) {
    var links = div.getElementsByTagName('table');
    for (var i=0;i<links.length;)
    {
        if (links[i].textContent.trim().length===0 && links[i].getElementsByTagName('img').length === 0)//3.3 don't remove table with images
            links[i].parentNode.removeChild(links[i]);
        else if (links[i].getElementsByTagName('tr').length === 1 && links[i].getElementsByTagName('td').length === 1)
        {
            let div = document.createElement('div');
            div.innerHTML = links[i].getElementsByTagName('td')[0].innerHTML;
            links[i].parentNode.replaceChild(div,links[i]);
        }
        else
            i++;
    }
},

removeTablesWithLinks: function (div) {

    var elems = div.getElementsByTagName('table');
    for (var i=0;i<elems.length;)
    {
        //3000 3.0 http://theeconomiccollapseblog.com/ article inside TABLE
        //3.3 200 for http://www.theplantedtank.co.uk/algae.htm
        if (elems[i].textContent.trim().length >= MIN_TABLE_CONTENT_LENGTH || elems[i].getElementsByTagName('img').length > 0)//3.3 don't remove table with images
        {
            i++;
            continue;
        }
        var links = elems[i].getElementsByTagName('a');
        var nsamehostname = 0;
        for (var j=0;j<links.length;j++)
        {
            var href = links[j].href;
            if (href !== null)
            {
                try {
                    var url = new URL(href);
                    if (url.hostname === window.location.hostname)
                        nsamehostname++;
                } catch (eurl) {}
            }
        }
        if (nsamehostname >= links.length/2)
            elems[i].parentNode.removeChild(elems[i]);
        else
            i++;
    }
},

unwrapLongLI: function (div) {
    var uls = div.getElementsByTagName('ul');
    for (var i=0;i<uls.length;)
    {
        var lis = uls[i].getElementsByTagName('li');
        var longEntry = false;
        for (var j=0;j<lis.length;j++)
        {
            if (lis[j].innerText.length > 3000)
            {
                longEntry = true;
                break;
            }
        }
        if (longEntry)
        {
            for (var j=0;j<lis.length;)
            {
                lis[0].outerHTML = '<p>' + lis[0].innerHTML + '</p>';
            }
            uls[i].outerHTML = '<p>' + uls[i].innerHTML + '</p>';
        }
        else
            i++;
    }
},

isArticleVisible: function (elem){
    var e = elem;
    while (e && e.nodeType == 1)
    {

      if (getComputedStyle(e).display=='none')
          return false;
      else
          e = e.parentNode;
    }
    return true;
},

/*keepFirstArticle: function (div) {

    var articles = div.getElementsByTagName('article');
    if (articles.length<2)
        return;
    var firstArticle = null;
    for (var i=0;i<articles.length;i++)
    {
        if (!firstArticle && this.isArticleVisible(articles[i]))
            firstArticle = articles[i];
    }
    for (var i=1;i<articles.length;i++)
    {
        //if (articles[i].parentNode != firstArticle)
        if (!firstArticle.contains(articles[i]))
            articles[i].parentNode.removeChild(articles[i]);
    }
},*/


/*removeWithRules: function(div)
{
    var elems = div.getElementsByTagName('header');
    for (var i=0;i<elems.length;i++)
    {
        if (elems[i].hasAttribute('role') && elems[i].getAttribute('role')=='banner')
        {
            elems[i].parentNode.removeChild(elems[i]);
            i--;
        }
    }
},*/

markHiddenWithIDs: function (ids) {
    for (var i=0;i<ids.length;i++)
    {
        var e = document.querySelectorAll('[id=' + ids[i] + ']');
        for (var a=0;a<e.length;a++)
            e[a].setAttribute('readerhidden', 'markhiddenwithids'+ids[i]);
    }
},


goodAspectRatioForImageHeader: function (w,h) {
    if (h == 0 || w == 0)
        return false;
    //2.4 changed from 6 to 5 because ad banners were sometimes slipping in
    if (h >= 5 * w) // tall images should be excluded (e.g. 10x100)
        return false;
    else
        return true;
},

goodAspectRatio: function (w,h) {
    if (h == 0 || w == 0)
        return false;
    if (w/h < ASPECT_RATIO && h/w<ASPECT_RATIO)
        return true;
    else
        return false;
},
getComments: function(elem) {
        var children = elem.childNodes;
        var comments = [];

        for (var i=0, len=children.length; i<len; i++) {
            if (children[i].nodeType == Node.COMMENT_NODE) {
                comments.push(children[i]);
            }
            else
                comments = comments.concat(this.getComments(children[i]));
        }
        return comments;
    },
removeAllComments:function(elem)
    {
        var comments = this.getComments(elem);

        for (var i=0, len=comments.length; i<len; i++) {
        comments[i].parentNode.removeChild(comments[i]);
        }
    },

replaceNodeWithMedia:function(_node,media)
{
    var a = document.createElement('a');
    a.href = media.url;
    a.className = 'videobox';
    var img = document.createElement('img');
    img.src = media.poster;
    if (media.type == 'youtube')
        a.setAttribute('youtubeid',media.id);
    if (media.poster == 'getasynch')
        img.setAttribute('backimage','getasynch');
    else
        img.setAttribute('backimage','fixit');
    img.width = 320;
    a.appendChild(img);
    _node.parentNode.replaceChild(a,_node);
    if (a.parentNode.tagName=='OBJECT')
        a.parentNode.outerHTML = a.outerHTML;
},

replaceVideoWithPoster:function(_node){
    var _src = _node.getAttribute('src');
    var media = this.testUrlForMedia(mydecode(_src));//sometimes videos are using embedly to point to vimeo videos
    if (!media)
    {
        return false;
    }
    this.replaceNodeWithMedia(_node,media);
    return true;
},

keepBackgroundImages: function (tagname,elem,maxHeight,p_headerSize,p_headerImage,scrollTop)
{
    var headerSize = p_headerSize;
    var headerImage = p_headerImage;
    var divs = elem.getElementsByTagName(tagname);
    for (var i=0;i<divs.length;i++)
    {
        //3.0
        if (this.isAnyParentNodeHidden(divs[i]))
            continue;
        var rect = divs[i].getBoundingClientRect();
        var top = rect.top + scrollTop;
        if (top >= maxHeight)
            continue;
        if (rect.width >= MIN_WIDTH_HEADER && rect.height >= MIN_HEIGHT_HEADER && this.goodAspectRatioForImageHeader(rect.width,rect.height))
        {
            if (rect.width*rect.height > headerSize)
            {
                var src = this.getLazySrc(divs[i]);
                if (!src)
                    src = this.getBackgroundImage(divs[i]);
                if (src && src.indexOf('data:') === 0)
                    continue;
                if (src && this.keepImageByUrl(src) && src.indexOf('gradient')==-1)// && src.indexOf('.gif') == -1)
                {
                    headerImage = src;
                    headerSize = rect.width*rect.height;
                }
            }
        }
    }
    return {size:headerSize,image:headerImage};
},

lazyLoader: function(pattern,obj)
{
    try {
    for (var i=0;i<obj.length;i++)
    {
        if (obj[i].size && obj[i].size >= 320)
        {
            return pattern.replace('{{size}}',obj[i].slug);
        }
        else if (obj[i] >= 320)
            return pattern.replace('{{size}}',obj[i]);
    }
    if (obj[0].size)
        return pattern.replace('{{size}}',obj[0].slug);
    else
        return pattern.replace('{{size}}',obj[0]);
    }catch(exc){return null;}
},

removeAllWithAttributes: function(attributeNames,element,markhidden)
{
    var elems = element.getElementsByTagName('*',element);
    for (var i=0;i<elems.length;i++)
    {
        var remove = false;
        for (var k in attributeNames)
        {
            if (elems[i].hasAttribute(k))
            {
                var array = attributeNames[k];
                if (array.length === 0)
                    remove = true;
                else
                    remove = array.indexOf(elems[i].getAttribute(k)) != -1;
                if (remove)
                    break;
            }
        }
        if (remove)
        {
            if (markhidden)
            {
                elems[i].setAttribute('readerhidden','attribute');
            }
            else
            {
                elems[i].parentNode.removeChild(elems[i]);
                i--;
            }
        }
    }
},

removeExactClassNames: function (list,element,markhidden)
{
    var elems = element.getElementsByTagName('*');
    for (var i=0;i<elems.length;i++)
    {
        if (elems[i].tagName==='ARTICLE')
            continue;//2.5 to fix http://antirez.com/news/100
        if (elems[i].hasAttribute('class') && list.indexOf(elems[i].getAttribute('class')) != -1)
        {
            if (markhidden || KEEP_HIDDEN)
            {
                elems[i].setAttribute('readerhidden','exactclassnames');
            }
            else
            {
                elems[i].parentNode.removeChild(elems[i]);
                i--;
            }
        }
    }

},

removeAllClasses: function(classnames,element,exactMatch,markhidden,anyposition)
    {
        //var removed = [];
    //var elems = element.getElementsByClassName(classname);
    var elems = element.getElementsByTagName('*');
    for (var i=0;i<elems.length;i++)
    {
        //if (elems[i].tagName === 'ARTICLE')
        //    continue;//2.5 to fix http://antirez.com/news/100
        if (elems[i].hasAttribute('class'))
        {
            var c = elems[i].getAttribute('class');
            for (var j=0;j<classnames.length;j++)
            {
                if (!classnames[j])
                    continue;
                if (keepCommentSpan && classnames[j] === 'comment')
                    continue;
                var remove = false;
                if (exactMatch)
                {
                    if (classnames[j].length <= 5)
                        remove = (classnames[j] == c);
                    else
                        remove = c.indexOf(classnames[j]) == 0 && classnames[j].length < 2*c.length;//2.8 'top','info' on bbc.com/travel
                }
                else
                {
                    //remove = (c.indexOf(classnames[j]) != -1);
                    var position = c.indexOf(classnames[j]);
                    if (anyposition)
                        remove = position >= 0;
                    else
                        remove = (position>=0 && position<16);
                }
                if (remove)
                {
                    //removed.push(classnames[j]);
                    if (markhidden)
                        elems[i].setAttribute('readerhidden',c + '|' + classnames[j]);
                    else
                    {
                        if (KEEP_HIDDEN)
                            elems[i].setAttribute('readerhidden',c + '|' + classnames[j]);
                        else
                        {
                            elems[i].parentNode.removeChild(elems[i]);
                            i--;
                        }
                    }
                    break;
                }
            }
        }
    }
        //return removed;
},
removeAmp: function(div)
{
    this.removeAll('amp-iframe',div);
    this.removeAll('amp-ad-exit',div); //4.9
    this.removeAll('amp-pixel',div); //4.9
    this.removeAll('amp-analytics',div); //4.9
    this.removeAll('amp-ad',div); //4.9
    this.removeAll('amp-embed',div); //7.9 https://amp.lepoint.fr/2350166
},
removeAll: function(tagname,element)
{
    //if (!element)
    //    return;
    var elements = element.getElementsByTagName(tagname);
    for (var i=0;i<elements.length;)
    {
        elements[i].parentNode.removeChild(elements[i]);
    }
},

extractImagesFromNoScript: function (div)
{
  let fakediv = document.createElement('div');
  let noscript = div.querySelectorAll('noscript');
  noscript.forEach(n => {
   {
     fakediv.innerHTML = n.textContent;
     let img = fakediv.querySelector('img');
     if (img && img.src > '')
     {
       /*if (n.previousSibling && n.previousSibling.tagName === 'IMG' && n.previousSibling.getAttribute('src') > '')
       {
       }
       else if (n.previousElementSibling && n.previousElementSibling.querySelectorAll('IMG').length > 0 && n.previousElementSibling.querySelector('IMG').getAttribute('src') > '')
       {
       }
       else*/
       {
          n.outerHTML = '<img width=320 src="' + img.src + '">';
       }
     }
   }
  });
},
removeMarkedHidden: function(tagname,elem)
{
    if (KEEP_HIDDEN)
        return;

    //3.6
    var divs = elem.querySelectorAll(tagname);
    for (var i=0;i<divs.length;i++)
    {
        var _node = divs[i];
        if (_node.hasAttribute('readerhidden'))
            _node.parentNode.removeChild(_node);
    }
},


removeDataURI: function(tagname,elem)
    {
        var divs = elem.getElementsByTagName(tagname);
        for (var i=0;i<divs.length;)
        {
            var _node = divs[i];
            var url = _node.src || _node.href;
            if (url.indexOf('data')==0)
            {
                if (_node.src)
                    _node.src = '';
                if (_node.href)
                    _node.href = '';
                i++;
            }
            else
                i++;
        }
    },

markHidden: function(tagname,elem)
    {
        var divs = elem.getElementsByTagName(tagname);
        for (var i=0;i<divs.length;i++)
        {
            var _node = divs[i];
            try {
                var hidden = this.isNodeHidden(_node);
                if (hidden)
                    _node.setAttribute('readerhidden', 'markhidden2:' + hidden);
            }catch(exc){}
        }
    },

hideClassNames : function (name) {
    for (var i=0;i<classNamesList.length;i++)
    {
        if (name == classNamesList[i])
            return true;
    }
    return false;
},

isAnyParentNodeHidden: function(_node)
    {
        if (!_node)
            return false;
        var n = _node;
        var prevn = n;
        while (n!=null && n.tagName !== 'BODY')// && prevn !=n && n.nodeType === 1)
        {
            if (this.isNodeHidden(n))
                return true;
            else
            {
                prevn = n;
                n = n.parentNode;
            }
        }
        return false;
    },

    isNodeHidden: function(_node)
    {
        try {
            if (!_node)
                return null;
            if (_node.hasAttribute('readerhidden'))//1.5 to not count image header that have been hidden already
                return true;
            var rect = _node.getBoundingClientRect();
            //3.5 fixed for <article> of http://themindcircle.com/mysterious-giant-sphere-unearthed-forest-divides-opinion/
            // now check also offsetwidth and offsetheight
            //if (_node.offsetLeft+_node.offsetWidth < 0 || _node.offsetTop+_node.offsetHeight < 0)
            if (rect.x+rect.width <= 2 && rect.height <= 2)
                return _node.offsetLeft + ',' +_node.offsetTop+','+_node.offsetWidth+','+_node.offsetHeight;
            var style = getComputedStyle(_node);
            if (!style)
                return null;
            if (style['visibility'] === 'hidden')
                return 'visibilityhidden';
            var display = style['display'];
            if (!display)
                return 'nodisplay';
            if (display === 'none' || display === 'hidden') // 2.5: remove none from test for scfbm.biomedcentral.com
            {
                //_node.setAttribute('readerclass',display);
                if (display === 'none' && window.location.hostname.indexOf('.biomedcentral.com') != -1)
                    return null;
                return 'displaynone';
            }
            else
            {
                if (_node.hasAttribute('class') && this.hideClassNames(_node.className))
                {
                    return 'hideclassnames'+_node.className;
                }
                else
                    return null;
            }
        } catch (ehidden) {return null;}
},

placeHolderSVG: function(elem)
{
    elem.querySelectorAll('svg').forEach(svg => {
        let content = svg.outerHTML;
        let r = svg.getBoundingClientRect();
        if (r.width > MIN_SVG && r.height > MIN_SVG)
        {
            let svgimgcontent = r.width + '#' + r.height + '#' + btoa(unescape(encodeURIComponent(content)));
            svg.setAttribute('svgimgcontent',svgimgcontent);
        }
    });
},

removeNonVideo: function(tagname,div)
    {
        var _keep_video_from_domain= [
                                      //'volume.vox-cdn.com/embed',
                                      '.com/video',
                                      /* video */     'vine.co','engadget.com/embed','youtu.be','dailymotion.com','youtube.com', 'youtube-nocookie.com', 'vimeo.com', 'hulu.com', 'flickr.com',
                                      /* other */     'yahoo.com', 'newsnetz.ch'
                                      /*Laurent*/,'washingtonpost.com/posttv',/*'twitter-tweet', 'instagram-media',*/  'player.theplatform.com','videoId=','nytimes.com'/*,'foxnews.com'*/
                                      ];
        var iframes = div.getElementsByTagName(tagname);
        for (var i=0;i<iframes.length;)
        {
            var _node = iframes[i];
            if (_node.hasAttribute('id') && _node.getAttribute('id').indexOf('youtube-') === 0)
            {
                var youtubeid = _node.getAttribute('id').substring('youtube-'.length);
                var a = document.createElement('a');
                a.className = 'videobox';
                a.href = 'http://youtube.com/watch?v=' + youtubeid;
                var img = document.createElement('img');
                img.width = 320;
                img.src = 'http://img.youtube.com/vi/' + youtubeid + '/0.jpg';
                a.appendChild(img);
                _node.parentNode.replaceChild(a,_node);
                continue;
            }
            var className = _node.className;
            var attributes = _node.attributes;
            for (var a=0;a<attributes.length;)
            {
                if (attributes[a].name != 'src')// && attributes[a].name != 'class')
                    _node.removeAttribute(attributes[a].name);
                else
                    a++;
            }

            var _src = _node.getAttribute('src');
            var _skip = ((_src > '') ? false : true);
            if (!_skip)
            {
                if (className && className.indexOf('instagram-')!=-1 && _src.indexOf('instagram.com/p/') != -1)
                {
                    var img = document.createElement('img');
                    img.className = 'instagram-media';//2.4
                    img.width = 306;
                    img.height = 306;
                    try {
                        var j = _src.indexOf('/embed/');
                        //img.src = _src.substring(0,j) + '/media/?size=m';//t,m,l
                        // 2.4
                        img.src = 'http://api.instagram.com/oembed?url=' + _src.substring(0,j);
                    }catch(esrc){}
                    _node.parentNode.replaceChild(img,_node);
                }
                else if (_src.indexOf('embedly.com') !== -1)
                {
                    var twitterSchema = this.getQueryParam('schema',_src);
                    if (twitterSchema && twitterSchema == 'twitter')
                    {
                        var urltweet = this.getQueryParam('url',_src);
                        var a = document.createElement('p');
                        a.textContent = 'this is a tweet from Laurent ' + mydecode(urltweet);
                        _node.parentNode.replaceChild(a,_node);
                    }
                    else
                    {
                      var video_src = this.getQueryParam('src',_src);
                      if (!video_src)
                          video_src = this.getQueryParam('url',_src);
                        var image_src = this.getQueryParam('image',_src);
                        if (image_src)
                            image_src = mydecode(image_src);
                      if (video_src && this.keepImageByUrl(video_src) /*3.8*/)
                      {
                          var a = document.createElement('a');
                          a.className = 'videobox';
                          a.href = mydecode(video_src);

                          var media = this.testUrlForMedia(mydecode(video_src));
                          if (media)
                          {
                              a.href = media.url;
                              var img = document.createElement('img');
                              if (image_src) // sometimes the embedly url has the image set to the poster, use that
                                  media.poster = image_src;
                              img.src = media.poster;
                              if (media.type == 'youtube')
                                  a.setAttribute('youtubeid',media.id);
                              if (media.poster == 'getasynch')
                                  img.setAttribute('backimage','getasynch');
                              else
                                  img.setAttribute('backimage','fixit');
                              img.width = 320;
                              a.appendChild(img);
                          }
                          else
                              a.innerHTML = PLAY_VIDEO;
                          _node.parentNode.replaceChild(a,_node);
                      }
                    }
                }
                else
                {
                    _skip = true;
                    //if (!this.isAnyParentNodeHidden(_node))
                    {
                        var media = this.testUrlForMedia(mydecode(_src));
                        if (media)
                        {
                            this.replaceNodeWithMedia(_node,media);
                            i--;
                            _skip = false;
                        }
                        else
                        {
                            for (var j=0; _skip && j<_keep_video_from_domain.length;j++)
                            {
                                if (_src.indexOf(_keep_video_from_domain[j]) > -1)
                                {
                                    var wasReplaced = this.replaceVideoWithPoster(_node);
                                    if (wasReplaced)
                                        i--;
                                    _skip = false;
                                }
                            }
                        }
                    }
                    if (_skip)
                        _node.parentNode.removeChild(_node);
                    else
                        i++;
                }
            }
            else
                _node.parentNode.removeChild(_node);
        }
    },

processiFrames:function(body)
{
    var iframes = body.getElementsByTagName('iframe');
    for (var i=0;i<iframes.length;i++)
    {
        if (iframes[i].id && iframes[i].id.indexOf('lightbox') === 0)
            {
                iframes[i].parentNode.removeChild(iframes[i]);
                i--;
                continue;
            }
        var src = iframes[i].src;
        if (src>'' && !this.keepImageByUrl(src))
        {
            //3.8
            iframes[i].parentNode.removeChild(iframes[i]);
            i--;
            continue;
        }
        if (src>'' && src.indexOf('gfycat.com/ifr/') !== -1)
        {
            var name = src.split('gfycat.com/ifr/')[1];//WhirlwindAdmirableAnemonecrab)
            var posterurl = 'https://thumbs.gfycat.com/' + name + '-mobile.jpg';
            var mp4url = 'https://thumbs.gfycat.com/' + name + '-mobile.mp4';
            content = '<a class="videobox" href="' + mp4url + '"><img src="' + posterurl + '"></a>';
            iframes[i].setAttribute('readeriframe',encodeURIComponent(content));
        }
        //www.bloomberg.com/toaster/v1/charts/22feca4e58904689aef9bcf5f461da48.html
        if (src>'' && src.indexOf('toaster/v1/charts') !== -1)
        {
            var chart = document.createElement('img');
            chart.src = src.replace('.html','.png');
            iframes[i].parentNode.replaceChild(chart,iframes[i]);
            i--;
            continue;
        }
        else if (src > '' && src.indexOf('embedly.com') !== -1)
        {
            var twitterSchema = this.getQueryParam('schema',src);
            if (twitterSchema && twitterSchema === 'twitter')
            {
                var urltweet = this.getQueryParam('url',src);
                var atweet = document.createElement('a');
                atweet.className = 'videobox';
                atweet.href = mydecode(urltweet);
                iframes[i].parentNode.replaceChild(atweet,iframes[i]);
                i--;
                continue;
            }
        }
        else if (src>'' && src.indexOf('slideshare.net') !== -1)
        {
            iframes[i].setAttribute('readeriframe',encodeURIComponent('<a class="videobox" href="' + src + '"><img width=320 height=240 src="http://www.slideshare.net/api/oembed/2?url=' + src + '"></a>'));
            continue;
        }
        var content = '';
        if (iframes[i].getAttribute('data-src') > '')
        {
            var youtube_src = this.getQueryParam('url',mydecode(iframes[i].getAttribute('data-src')));
            var media = this.testUrlForMedia(youtube_src);
            if (media)
            {
                content = '<a class="videobox" youtubeid=' + media.id + ' href="' + media.url + '"><img src="' + media.poster + '"></a>';
                iframes[i].setAttribute('readeriframe',encodeURIComponent(content));
            }
        }
        else
        {
            try {
                this.markDIVBackgroundImages('div',iframes[i].contentDocument.body);
                content = this.getiFrameContent(iframes[i]);
            }
            catch (eframes) { /*content += 'eframes:'+eframes;*/ }
        }
        //2.9 always replace iframe so we want content set to something even empty
        // otherwise iframe from nytimes.com signature form stays around
        if (content.length > 0)
            iframes[i].setAttribute('readeriframe',encodeURIComponent(content));
    }
},

extractTweets: function(elem) {
    var blocks = elem.querySelectorAll('blockquote');
    var finalHTML = '';
    for (var b=0;b<blocks.length;b++)
    {
        var block = blocks[b];
        var header = 'content';
        var authorClassName = '.TweetAuthor';//'p-author';//2.9
        if (block.querySelectorAll(authorClassName).length > 0)
            header = block.querySelectorAll(authorClassName)[0].innerText.trim();
        var content = 'to be replaced with original attribute';
        var entries = block.querySelectorAll('.e-entry-title');
        var original = [];
        /*2.4 append content after photosif (entries && entries.length>0)
         original.push(entries[0].outerHTML);*/
        var cardimages = elem.querySelectorAll('img');
        //var cardimages = block.getElementsByTagName('img');
        for (var img=0;img<cardimages.length;img++)
        {
            var twitterImageClasses = ['CroppedImage-','MediaCard-','autosized-media','cropped-media','NaturalImage-image'];
            var matchesClass = false;
            for (var c=0;!matchesClass && c<twitterImageClasses.length;c++)
            {
                if (cardimages[img].className.indexOf(twitterImageClasses[c]) != -1)
                {
                    matchesClass = true;
                    break;
                }
            }
            if (matchesClass)
                //if (twitterImageClasses.indexOf(cardimages[img].className) != -1)
            {
                var entryimage = document.createElement('img');
                entryimage.src = cardimages[img].src;
                original.push(entryimage.outerHTML);
            }
        }
        try {
            var cardvideos = elem.querySelectorAll('iframe');
            //var cardvideos = block.getElementsByTagName('iframe');
            for (var img=0;img<cardvideos.length;img++)
            {
                //if (cardvideos[img].className == 'autosized-media')
                {
                    var image_src = this.getQueryParam('image_src',mydecode(cardvideos[img].src));
                    if (image_src)
                    {
                        var a = document.createElement('a');
                        a.className = 'videobox';
                        a.href = cardvideos[img].src;

                        var image = document.createElement('img');
                        image.setAttribute('backimage','fixit');
                        image.src = mydecode(image_src);
                        a.appendChild(image);
                        original.push(a.outerHTML);
                    }
                    else if (cardvideos[img].src) // could be a vine.co URL
                    {
                        var a = document.createElement('a');
                        a.className = 'videobox';
                        a.href = cardvideos[img].src;

                        var image = document.createElement('img');
                        var media = this.testUrlForMedia(a.href);
                        if (media)
                            image.src = media.poster;
                        else
                            image.setAttribute('backimage','getasynch');
                        a.appendChild(image);
                        original.push(a.outerHTML);
                    }
                }
            }
        }
        catch (evideo){}
        //2.4 append content after photos
        original.push('<div>' + header + '</div>');
        if (entries && entries.length>0)
        {
            //2.5: removeTrackers from twitter urls
            try {
                var utm = document.createElement('div');
                utm.innerHTML = entries[0].outerHTML;
                var links = utm.getElementsByTagName('a');
                for (var l=0;l<links.length;l++)
                {
                    if (links[l].hasAttribute('data-expanded-url'))
                    {
                        var simpleurl = this.removeTrackers(links[l].getAttribute('data-expanded-url'));
                        links[l].href = simpleurl;
                        links[l].innerHTML = simpleurl;
                    }
                }
                original.push(utm.innerHTML);
            } catch (elinks) {
                original.push(entries[0].outerHTML);
            }
        }
        var original = encodeURIComponent(original.join(''));
        var text    = '<blockquote class="twitter-tweet" original="' + original + '"><div>' + header + '</div><p>' + content + '</p></blockquote>';
        //var text    = '<blockquote class="twitter-tweet" original="' + original + '"></blockquote>';
        finalHTML += text;
    }
    return finalHTML;
},

extractVideoTweets: function (elem)
{
    var finalHTML = '';
    try {
        var divs = elem.getElementsByClassName('embedded-video');
        if (divs.length>0 && divs[0].hasAttribute('data-player-config'))
        {
            var json = JSON.parse(divs[0].getAttribute('data-player-config'));
            var user = json.user.screen_name;
            var videourl = json.playlist[0].source;
            var imageurl = json.posterImageUrl;
            var a = document.createElement('a');
            a.className = 'videobox';
            a.href = videourl;
            var image = document.createElement('img');
            image.setAttribute('src',imageurl);
            a.appendChild(image);
            var original = encodeURIComponent(a.outerHTML);
            var text    = '<blockquote class="twitter-tweet" original="' + original + '"><div>@' + user + '</div><p>twitter video</p></blockquote>';
            finalHTML = text;
        }
    }
    catch (etwittervideo)
    {
        finalHTML = 'error twitter video' + etwittervideo;
    }
    return finalHTML;
},

getiFrameContent: function (iframe)
{
    var content = '';
    try {
        var sub = iframe.contentDocument.getElementsByTagName('iframe');
        for (var i=0;i<sub.length;i++)
        {
            content += this.getiFrameContent(sub[i]);
        }
    } catch (eno) {
        /*content += 'eno:' + eno;*/
    }

    try {
        this.markDIVBackgroundImages('div',iframe.contentDocument.body);
        var framediv = document.createElement('div');
        framediv.className = 'tablecontainer';
        if (iframe.className && iframe.className.indexOf('twitter-tweet')!=-1)
        {
            framediv.innerHTML = this.extractTweets(iframe.contentDocument.body);
        }
        else if (iframe.className && iframe.className.indexOf('twitter-video')!=-1)
        {
            framediv.innerHTML = this.extractVideoTweets(iframe.contentDocument.body);
        }
        else
        {
            framediv.innerHTML = iframe.contentDocument.body.innerHTML;
            this.removeAll('fieldset',framediv);//2.5
            this.removeAll('article-promo',framediv);//2.6
            this.removeAll('ins',framediv);//2.5
            this.removeAll('aside',framediv);//4.1
            this.removeAll('script',framediv);//this.removeAll('form',div);//NO! see below
            this.removeAll('frame',framediv);
            this.removeAll('link',framediv);this.removeAll('style',framediv);this.removeAll('footer',framediv);
            this.removeAll('noscript',framediv);
            this.removeAll('button',framediv);
            this.removeAll('input',framediv);
            this.removeAll('xmp',framediv);
            this.placeHolderSVG(framediv);
        }
        content += framediv.innerHTML;
    }
    catch (eiframe) { /*content += 'eiframe:'+eiframe;*/ }
    return content;
},

replaceBRWithP: function (div) {
    var elems = div.getElementsByTagName('br');
    for (var i=0;i<elems.length;)
    {
        var p = document.createElement('p');
        elems[0].parentNode.replaceChild(p,elems[0]);
    }
},

removeBySelector: function(toRemoveSelectors)
{
    for (let i=0;i<toRemoveSelectors.length;i++)
    {
        let elems = document.querySelectorAll(toRemoveSelectors[i]);
        elems.forEach(elem => {
          elem.setAttribute('readerhidden','toremoveselectors');
        });
    }
},

removeCopyrightFigCaption: function (div) {
    var fig = div.getElementsByTagName('figcaption');
    for (var i=0;i<fig.length;)
    {
        var t = fig[i].textContent.trim();
        if (t.indexOf('©') === 0 || t.indexOf('Courtesy') === 0)
            fig[i].parentNode.removeChild(fig[i]);
        else
            i++;
    }
},


replacePRE: function (div) {
    var pres = div.getElementsByTagName('pre');
    for (var i=0;i<pres.length;)
    {
        pres[i].outerHTML = '<div>' + pres[i].innerHTML.replace(/\n\n/g,'<br>').replace(/<p><\/p>/g,'<BR><BR>') + '</div>';
    }
},

removeTrackers: function (string)
{
    var url = null;
    try {
        url = new URL(string);
    }
    catch (e)
    {
        return string;
    }
    var res = url.href;
    //var pos = res.indexOf('#');
    //if (pos > 0)
    //    res = res.substring(0,pos);
    res = res.replace(/[?&]utm_.*/,'');
    res = res.replace(/[?&]campaign_.*/,'');
    res = res.replace(/[?&]WT\..*/,'');
    res = res.replace(/[?&]ns_.*/,'');//purify e.g. http://m.bbc.com/news/world-asia-30614627?ns_mchannel=social&ns_campaign=bbc_breaking&ns_source=twitter&ns_linkname=news_central
    res = res.replace(/[?&]rand=.*/,'');
    res = res.replace(/[?&]src=.*/,'');
    res = res.replace(/[?&]imm_mid=.*/,'');//rice?imm_mid=0cbaaf&cmp=em-iot-na-na-newsltr_iot_20150129
    res = res.replace(/[?&]cmp=.*/,'');//rice?imm_mid=0cbaaf&cmp=em-iot-na-na-newsltr_iot_20150129

    res = res.replace(/[?&]ncid=.*/,'');//?ncid=rss&cps=gravity_1462_-8803029403104513141
    res = res.replace(/[?&]cps=.*/,'');//?ncid=rss&cps=gravity_1462_-8803029403104513141

    res = res.replace(/[?&]mc_cid=.*/,'');//mc_cid=5c2d79e199&mc_eid=239d9471b6
    res = res.replace(/[?&]mc_eid=.*/,'');//mc_cid=5c2d79e199&mc_eid=239d9471b6
    res = res.replace(/[?&]mbid=.*/,'');//mc_cid=5c2d79e199&mc_eid=239d9471b6
    res = res.replace(/[?&]__twitter_impression=.*/,'');//mc_cid=5c2d79e199&mc_eid=239d9471b6
    if (res.indexOf('nytimes.com')!=-1)//nytimes urls can have _r=0 or _r=1 so remove them
        //    res.url = res.url.replace(/[?&]_r.*/,'');
        res = res.split('?')[0];//remove search to url
    return res;
},

removeHeaderImageIfAlreadyAnImage: function (div,res)
{
    // remove headerimage if already one of the images in the document
    if (res.headerimage > '')
    {
        let images = div.getElementsByTagName('img');
        for (let i=0;i<images.length;i++)
        {
            //if (res.headerimage == images[i].src)
            if (this.sameHeader(res.headerimage,images[i].src))
            {
                res.headerimage = '';
                break;
            }
        }
    }
},
sameHeader: function(url1,url2)
{
    //https://miro.medium.com/max/552/1*Keuif7_fJ-lap1rigZTcig.png
    //https://miro.medium.com/max/6528/1*Keuif7_fJ-lap1rigZTcig.png
    if (url1.indexOf('medium.com/max/') !== -1 && url2.indexOf('medium.com/max/') !== -1)
    {
        if (url1.split('/').pop() === url2.split('/').pop())
            return true;
    }
    return url1 === url2;
},

makeGalleries: function (classname,div)
{
    var gallery = div.getElementsByClassName(classname);
    for (var i=0;i<gallery.length;i++)
    {
        var img = gallery[i].getElementsByTagName('img');
        if (img.length < 2)
            return;
        var html = [];
        for (var j=0;j<img.length;j++)
            html.push('<img width=320 height=240 src="' + img[j].src + '">');
        gallery[i].innerHTML = html.join('');
        gallery[i].className = 'readerviewslide';
    }
},

findHeaderInBodyImages: function (maxHeight,scrollTop) {
    var imgs = document.getElementsByTagName('img');
    var headerImage = null;
    var headerSize = 0;
    //var added = [];
    for (var i=0;i<imgs.length;i++)
    {
        var img = imgs[i];
        //img.src = img.src; // important to make image urls absolute (e.g. email sharing...)
        var src = this.getLazySrc(img);//3.0 instead of directly src = img.src because we will duplicate header images otherwise that have srcset and src
        if (!src || src.length<3)
            continue;
        if (!this.keepImageByUrl(src))
            continue;
        if (this.isAnyParentNodeHidden(img) || !this.isArticleVisible(img))
            continue;
        //img.src = src;//3.3 make img src absolute
        //src = img.src;
        var rect = img.getBoundingClientRect();
        //img.width = rect.width;
        //img.height = rect.height;
        var top = rect.top + scrollTop;
        if (top >= maxHeight)
            continue;
        if (rect.left+rect.width <= 0 || rect.left >= window.innerWidth)
            continue;
        if (rect.width >= MIN_WIDTH_HEADER && rect.height >= MIN_HEIGHT_HEADER && this.goodAspectRatioForImageHeader(rect.width,rect.height))
        {
            if (rect.width*rect.height > headerSize)
            {
                headerSize = rect.width*rect.height;
                headerImage = src;
            }
        }
    }
    return {headerImage:headerImage,headerSize:headerSize};
},
/*reduceDataImages:function (div){
  let canvas = document.createElement('canvas');
  div.querySelectorAll('img').forEach(img => {

    if (img.naturalWidth > 200 && img.src && img.src.indexOf('data:image') === 0)
    {
      //console.log(img.naturalWidth,img.naturalHeight,img.src.length);
      canvas.height = (img.naturalHeight * 200 / img.naturalWidth) | 0;
      canvas.width = 200;
      //console.log('drawing',canvas.width,canvas.height);
      canvas.getContext('2d').drawImage(img,0,0,img.naturalWidth,img.naturalHeight,0,0,canvas.width,canvas.height);
      let newsrc = canvas.toDataURL('image/jpeg',0.7);
      //console.log(canvas.width,canvas.height,img.src.length,newsrc.length);
      img.src = newsrc;
    }
  });
},*/
// https://news.google.com/news/amp?caurl=http%3A%2F%2Famp.usatoday.com%2Fstory%2F97182748%2F
getAMP: function(url) {
    var ampsuffix = '/amp/s/';
    var amp = url.indexOf('.google.') > 0 && url.indexOf(ampsuffix) > 0;
    if (amp)
    {
        var amppos = url.indexOf(ampsuffix);
        return 'http://' + mydecode(url.substring(amppos+ampsuffix.length));
    }

    ampsuffix = '/amp/';
    amp = url.indexOf('.google.') > 0 && url.indexOf(ampsuffix) > 0;
    if (amp)
    {
        var amppos = url.indexOf(ampsuffix);
        return 'http://' + mydecode(url.substring(amppos+ampsuffix.length));
    }
    //https://news.google.com/news/amp?caurl=https%3A%2F%2Fwww.nytimes.com%2F2017%2F05%2F04%2Fworld%2Feurope%2Fmarine-le-pen-emmanuel-macron.html#pt0-691250
    ampsuffix = '/amp?caurl=';
    amp = url.indexOf('.google.') > 0 && url.indexOf(ampsuffix) > 0;
    if (amp)
    {
        var amppos = url.indexOf(ampsuffix);
        return mydecode(url.substring(amppos+ampsuffix.length));
    }
    //https://news.google.com/articles/
    if (url.indexOf('news.google.') !== -1 && url.indexOf('/articles') !== -1)
    {
        let iframes = document.querySelectorAll('iframe');
        if (iframes.length >= 1)
        {
          let u = new URL(iframes[0].src);
          u.hash = '';
          return u.href;
        }
        else
          return url;
    }
    return null;

},
unwrapPicture: function (elem) {
  // unwrap <picture> http://www.theatlantic.com/magazine/archive/2015/12/the-silicon-valley-suicides/413140/
  // and https://features.propublica.org/brazil-carbon-offsets/inconvenient-truth-carbon-credits-dont-work-deforestation-redd-acre-cambodia/

  let done = false;
  elem.querySelectorAll('picture').forEach(p => {
    let src = this.getLazySrc(p.querySelector('source'));
    if (src)
      p.outerHTML = '<img width=320 src=' + src + '>';
    else if (p.querySelector('img'))
      p.outerHTML = '<img width=320 src=' + this.getLazySrc(p.querySelector('img')) + '>';
  });

  //document.body.querySelectorAll('picture').forEach(p => p.outerHTML = '<img src=' + p.querySelector('source').getAttribute('data-srcset') + '>');
},
replaceWPCaptions: function (elem)
{
    let wpcaptions = elem.querySelectorAll('.wp-caption-text');
    wpcaptions.forEach(w => w.textContent = w.textContent.replace(/\[\+\]/g,'').replace(/\[-]/g,'').replace(/\n/g,'').replace(/\s+/g,' ').trim());
},
run: function(params) {

    var res = {};
    try {
        res.url = this.removeTrackers(window.location.href);
        if (document.body === null)//3.0 some urls don't contain 'pdf' && window.location.href.toLowerCase().indexOf('pdf') != -1)
        {
            res.isPDF = true;
            res.pdfFilename = window.location.pathname.split('/').pop();
            res.redirect = res.url;
            params.completionFunction(res);
            return;
        }

        if (getComputedStyle(document.body).direction === 'rtl')
            res.rtl = true;

        let wordimages = document.querySelectorAll('img');
        wordimages.forEach(l => {
          if (l.src && l.src.indexOf('x-apple-ql-id') === 0)
          {
            res.isWord = true;
          }
        });
        if (res.isWord)
        {
            res.isWord = true;
            res.redirect = res.url;
            params.completionFunction(res);
            return;
        }

        document.querySelectorAll('img').forEach(img => img.src = img.src);//v8.1 objective-see.com
        this.placeHolderSVG(document.body);
        this.unwrapPicture(document.body);
        this.replaceWPCaptions(document.body);
        this.extractImagesFromNoScript(document.body);//6.9

        //this.removeAll('noscript',document.body);//6.6
        this.decoderdiv = document.createElement('div');
        //var u = window.location;//already a URL new URL(window.location.href.toString());
        res.title = window.document.title.toString().trim();
        res.datetime = ((new Date().getTime()/1000) | 0) + '';
        res.fulltext = 'nothing';
        res.headerimage = '';


        var ampurl = this.getAMP(res.url);
        if (ampurl)
        {
            res.redirect = ampurl;
            params.completionFunction(res);
            return;
        }
        // 5.2
        if (window.location.hostname.indexOf('tit4tot.com') !== -1 && document.querySelector('iframe'))
        {
            res.redirect = document.querySelector('iframe').src;
            params.completionFunction(res);
            return;
        }
        // 3.6
        if (window.location.hostname.indexOf('taam.net') !== -1)
        {
            res.redirect = document.getElementsByTagName('frame')[0].src;
            params.completionFunction(res);
            return;
        }

        var forbes = res.url.indexOf('forbes.com/forbes/welcome/?toURL=');
        if (forbes !== -1)
        {
            //document.cookie = 'dailyWelcomeCookie=dailyCookie_forDate;welcomeAd=sessionCookie__welcome; path=/';
            try {
            var obj = getJsonFromUrl(new URL(res.url));
            res.redirect = obj.toURL;
            params.completionFunction(res);
            }
            catch (e) { res.error = 'error' + e; params.completionFunction(res);}
            return;
        }

        // 2.4: because some pages redefine window.webkit
        // e.g. http://www.i-programmer.info/news/193-android/9159-amazon-reports-underground-success.html
        delete window.webkit;


        // 2.5 make audio absolute, e.g. https://fr.m.wikipedia.org/wiki/Mistral_(vent)#Incendies_de_for.C3.AAt
        var audio = document.body.getElementsByTagName('audio');
        for (var i=0;i<audio.length;i++)
        {
            var a = audio[i];
            var sources = a.getElementsByTagName('source');
            for (var s=0;s<sources.length;s++)
            {
                if (sources[s].hasAttribute('src'))
                    sources[s].src = sources[s].src;
            }
        }
        //res.userSelection = this.findSelection(window);

        var maxHeight = 2 * window.innerHeight; // we want to keep images even if a little below the fold, e.g. elephantjournal, cointelegraph.com
        //var scrollTop = document.body.scrollTop;
        var scrollTop = document.documentElement.scrollTop;
        if (window.location.hostname.indexOf('notify.co') != -1)
        {
            var src = window.location.href;
            try {
                src = this.removeTrackers(document.getElementsByClassName('singleNotification')[0].getElementsByTagName('a')[0]);
            } catch (esrc) {}
            var html = 'Go to <a href="' + src + '">' + src + '</a> to view the original web page.';
            res.dontsave = 'true';
            res.fulltext = html;
            res.redirect = src;//2.8
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }
        //http://snip.ly/rRdQ
        if (window.location.hostname.indexOf('snip.ly') != -1)
        {
            var src = window.location.href;
            try {
                src = this.removeTrackers(document.getElementsByTagName('iframe')[0].src);
            } catch (esrc) {}
            var html = 'Go to <a href="' + src + '">' + src + '</a> to view the original web page.';
            res.dontsave = 'true';
            res.fulltext = html;
            res.redirect = src;//2.8
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        if (window.location.hostname.indexOf('.pixnet.net') !== -1)
        {
            var bodies = document.getElementsByClassName('article-content-inner');
            if (bodies.length == 1)
            {
                var headerData = this.findHeaderInBodyImages(maxHeight,scrollTop);
                res.headerimage = '';
                if (headerData.headerImage)
                    res.headerimage = headerData.headerImage;
                var div = document.createElement('div');
                div.innerHTML = bodies[0].innerHTML;

                var images = div.getElementsByTagName('img');
                for (var i=0;i<images.length;)
                {
                    var removed = false;
                    var src = this.getLazySrc(images[i]);
                    if (!this.keepImageByUrl(src))
                        images[i].parentNode.removeChild(images[i]);
                    else
                    {
                        images[i].src = src;
                        images[i].width = 320;
                        images[i].height = 240;
                        i++;
                    }
                }

                this.removeAll('fieldset',div);//2.5
                this.removeAll('ins',div);//2.5
                this.removeNonVideo('iframe',div);
                this.removeNonVideo('embed',div);
                this.removeNonVideo('object',div);
                this.removeAll('script',div);
                this.removeAmp(div);
                this.removeAll('article-promo',div);//2.6
                this.removeAll('noscript',div);
                this.removeAll('aside',div);//4.1
                this.removeAllWithAttributes(attributesToRemove,div);
                //this.makeBlockImages(div);
                res.fulltext = div.innerHTML;
                params.completionFunction(res);
                return;
            }
        }
        if (window.location.hostname.indexOf('.blogspot.') != -1)
        {
            // v1.4 make all link absolute
            var bodies = document.getElementsByClassName('post-body');
            if (bodies.length === 0)
            {
                bodies = document.getElementsByClassName('article-content');
                if (bodies.length >= 1)
                    bodies = [bodies[0]];
            }
            if (bodies.length == 1)
            {
                if (KEEP_LOCAL_IFRAMES)
                {
                    this.processiFrames(bodies[0]);
                }

                var headerData = this.findHeaderInBodyImages(maxHeight,scrollTop);
                res.headerimage = '';
                if (headerData.headerImage)
                    res.headerimage = headerData.headerImage;
                var div = document.createElement('div');
                div.innerHTML = bodies[0].innerHTML;
                if (KEEP_LOCAL_IFRAMES)
                {
                    var iframes = div.getElementsByTagName('iframe');
                    for (var i=0;i<iframes.length;)
                    {
                        if (iframes[i].hasAttribute('readeriframe'))
                        {
                            var newdiv = document.createElement('div');
                            newdiv.innerHTML = mydecode(iframes[i].getAttribute('readeriframe'));
                            iframes[i].parentNode.replaceChild(newdiv,iframes[i]);
                        }
                        else
                            i++;
                    }
                }
                this.removeAll('fieldset',div);//2.5
                this.removeAll('ins',div);//2.5
                this.removeNonVideo('iframe',div);
                this.removeNonVideo('embed',div);
                this.removeNonVideo('object',div);
                this.removeAll('script',div);
                this.removeAmp(div);
                this.removeAll('article-promo',div);//2.6
                this.removeAll('noscript',div);
                this.removeAll('aside',div);//4.1
                this.removeAllWithAttributes(attributesToRemove,div);
                this.makeBlockImages(div);
                res.fulltext = div.innerHTML;

                params.completionFunction(res);
                return;
            }
        }
        if (window.location.hostname.indexOf('speakerdeck.com') != -1)
        {
            var html = [];
            try {
                var previews = document.getElementsByClassName('speakerdeck-iframe')[0].contentDocument.getElementsByClassName('previews')[0];
                var htmlCollection = previews.getElementsByTagName('img');
                // convert to array to sort
                var slides = [].slice.call(htmlCollection);
                slides = slides.sort(function (a,b) { return parseInt(a.getAttribute('data-slide'))-parseInt(b.getAttribute('data-slide'));});
                for (var i=0;i<slides.length;i++)
                {
                    var thumb = slides[i].getAttribute('src');
                    var bigslide = thumb.replace('/thumb_','/');
                    html.push('<img class="slide" src="' + bigslide + '"><BR>');
                }
            }
            catch (espeakerdeck) {}
            res.fulltext = html.join('');

            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        if (window.location.href.indexOf('facebook.com') != -1 && window.location.href.indexOf('posts') != -1)
        {
            var div = document.createElement('div');
            if (document.querySelector('.story_body_container'))
            {
                div.innerHTML = document.querySelector('.story_body_container').innerHTML;
                res.fulltext = div.innerHTML;
                res.headerimage = '';
                params.completionFunction(res);
                return;
            }
        }

        if (window.location.href.indexOf('ukaps.org/forum/threads') != -1)
        {
            // v1.4 make all link absolute
            var messages = document.querySelectorAll('.messageText');
            var div = document.createElement('div');
            for (var i=0;i<messages.length;i++)
            {
                var d = document.createElement('div');
                d.innerHTML = messages[i].innerHTML + '<HR>';
                div.appendChild(d);
            }
            var imgs = div.getElementsByTagName('IMG');
            for (var i=0;i<imgs.length;i++)
                imgs[i].src = imgs[i].src;
            var links = div.getElementsByTagName('A');
            for (var i=0;i<links.length;i++)
                links[i].href = links[i].href;
            this.removeAllAttributes('*',div,['href','src']);
            res.fulltext = div.innerHTML;
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        if (window.location.hostname.indexOf('kaggle.com') !== -1 && window.location.href.indexOf('/discussion/') !== -1)
        {
            res.fulltext = 'Sorry, discussion pages are not working now, only articles :(';
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        /*if (window.location.hostname.indexOf('scribd.com') != -1)
        {
            var slides = document.querySelectorAll('.absimg');
            var html = [];
            for (var i=0;i<slides.length;i++)
                html.push('<img width=320 src=" ' + slides[i].src + '"/>')
            res.fulltext = html.join('');
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }*/

        if (window.location.hostname.indexOf('slideshare.net') != -1)
        {
            // v1.4 make all link absolute
            var slides = document.getElementsByClassName('slide_image');//3.1 changed to 'slide_image' 'slide'
            if (slides.length === 0)
                slides = document.querySelectorAll('img[class*="slide"]');//3.2 sometimes not yet loaded
            var html = [];
            for (var i=0;i<slides.length;i++)
            {
                var imgsrc = slides[i].getAttribute('data-normal');
                if (!imgsrc)
                    imgsrc = slides[i].getAttribute('data-original');
                if (!imgsrc)
                    imgsrc = slides[i].src;
                html.push('<img class="slide" src="' + imgsrc + '"><BR>');// 3.1 previously slides[i].getAttribute('data-original')
            }
            res.fulltext = html.join('');
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }
        if (window.location.hostname.indexOf('docs.com') != -1)
        {
            // v1.4 make all link absolute
            var slides = document.querySelectorAll('.icon-by-image');
            var html = [];
            for (var i=0;i<slides.length;i++)
            {
                var imgsrc = slides[i].getAttribute('src');
                if (imgsrc.indexOf('blob.core.windows.net') > 0)
                    html.push('<img class="slide" src="' + imgsrc + '"><BR>');
            }
            res.fulltext = html.join('');
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }
        //3.8 www.chess.com/forum/view
        if (window.location.href.indexOf('www.chess.com/forum/view') != -1)
        {
            var comments = document.querySelector('.comments');
            var html = [];
            if (comments)
            {
                var lis = comments.querySelectorAll('li');
                for (var i=0;i<lis.length;i++)
                {
                    html.push(lis[i].innerHTML);
                }
            }
            res.fulltext = html.join('');
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        if (window.location.href.indexOf('journals.plos.org') != -1 && document.querySelector('#articleText'))
        {
            var content = document.querySelector('#articleText');
            res.fulltext = 'TOTO est content' + content.innerHTML;
            res.headerimage = '';
            params.completionFunction(res);
            return;
        }

        if (window.location.hostname.indexOf('m.liberal.gr') != -1 && document.querySelector('.article_content'))
        {
            var html = document.querySelector('.article_content').innerHTML;
            var div = document.createElement('div');
            div.innerHTML = html;

            this.removeAllClasses(anypositionList,div,false,false,true);
            this.removeAllClasses(classNamesList,div,false);
            this.removeAllClasses(wholeClassNamesList,div,true);
            this.removeAllWithAttributes(attributesToRemove,div);
            this.removeExactClassNames(exactClassNamesList,div);
            this.removeAll('fieldset',div);//2.5
            this.removeAll('ins',div);//2.5
            this.removeAll('form',div);//OK for Wikipedia only (NO! see below)
            this.removeAll('script',div);
            this.removeAll('amp-ad-exit',div); //4.9
            this.removeAll('amp-pixel',div); //4.9
            this.removeAll('amp-analytics',div); //4.9
            this.removeAll('amp-ad',div); //4.9
            this.removeAll('article-promo',div);//2.6

            this.removeAll('link',div);
            this.removeAll('style',div);
            this.removeAll('footer',div);
            this.removeAll('noscript',div);
            this.removeAll('aside',div);//4.1
            this.removeAll('input',div);
            this.removeAll('xmp',div);
            this.removeAll('button',div);

            this.removeAllComments(div);

            this.removeAllClasses(['homonymie','plainlinks hlist','panel','metadata plainlinks stub','post-content','banner-container','bandeau-','dismissable-notice','siteNotice','pre-content','hatnote','infobox','footer-','last-modified','navigation-drawer','ui-button','frbanner','navbox','mw-headline-anchor','icon'],div);

            res.headerimage = '';
            if (document.querySelector('.full-image'))
                res.headerimage = res.fulltext = document.querySelector('.full-image').src;
            res.fulltext = div.innerHTML.replace(/\s+/g,' ');
            params.completionFunction(res);
            return;
        }

        var isWiki = window.location.hostname.indexOf('wikipedia.org') != -1 || window.location.hostname.indexOf('wikisource.org') != -1;
        if (isWiki)
        {
            // v1.4 make all link absolute
            var links = document.body.getElementsByTagName('a');
            for (var i=0;i<links.length;i++)
            {
                if (links[i].hasAttribute('href'))
                    links[i].href = links[i].href;
            }
            // v5.9
            var links = document.querySelectorAll('img');
            for (var i=0;i<links.length;i++)
            {
                if (links[i].hasAttribute('src'))
                    links[i].src = links[i].src;
            }

            var headerData = this.findHeaderInBodyImages(maxHeight,scrollTop);
            var headerSize = headerData.headerSize;
            var headerImage = headerData.headerImage;

            if (headerImage && headerImage != res.url)
                res.headerimage = headerImage;

            // copy the content into DIV
            var div = document.createElement('div');


            div.innerHTML = document.body.innerHTML;


            this.removeAll('fieldset',div);//2.5
            this.removeAll('ins',div);//2.5
            this.removeAll('form',div);//OK for Wikipedia only (NO! see below)
            this.removeAll('script',div);
            this.removeAll('amp-ad-exit',div); //4.9
            this.removeAll('amp-pixel',div); //4.9
            this.removeAll('amp-analytics',div); //4.9
            this.removeAll('amp-ad',div); //4.9
            this.removeAll('article-promo',div);//2.6

            this.removeAll('link',div);
            this.removeAll('style',div);
            this.removeAll('footer',div);
            this.removeAll('noscript',div);
            this.removeAll('aside',div);//4.1
            this.removeAll('input',div);
            this.removeAll('xmp',div);
            this.removeAll('button',div);

            this.removeAllComments(div);

            this.removeAllClasses(['toc-mobile','homonymie','plainlinks hlist','panel','metadata plainlinks stub','post-content','banner-container','bandeau-','dismissable-notice','siteNotice','pre-content','hatnote','infobox','footer-','last-modified','navigation-drawer','ui-button','frbanner','navbox','mw-headline-anchor','icon'],div);
            this.removeAllAttributes('*',div,wikiKeepAttributes);
            this.makeBlockImages(div);
            res.fulltext = div.innerHTML.replace(/\s+/g,' ');

            this.removeHeaderImageIfAlreadyAnImage(div,res);
            params.completionFunction(res);
            return;
        }

        this.removeBySelector(toRemoveSelectors);
        this.markHiddenWithIDs(hiddenDIV_IDs);

        // v2.4: draw SVG images into a CANVAS to get their data
        /*var images = document.body.getElementsByTagName('img');
        for (var i=0;i<images.length;i++)
        {
            try {
                var src = images[i].src;
                let rect = images[i].getBoundingClientRect();
                if (rect.width < MIN_WIDTH && rect.height < MIN_HEIGHT)
                    images[i].setAttribute('readerhidden','smallimage');

                if(src>'' && src.lastIndexOf('.svg') == src.length-4)// 2.5. regexp caused issues: src.match(svgExtension))
                {
                    var canvas = document.createElement('canvas');
                    var w = images[i].width;
                    var h = images[i].height;
                    canvas.width = w;
                    canvas.height = h;
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0,0,w,h)
                    ctx.drawImage(images[i],0,0);
                    images[i].src = canvas.toDataURL();
                    images[i].setAttribute('dontreduce',true);
                }
            } catch (eimage) {}
        }*/

        if (KEEP_LOCAL_IFRAMES)
        {
            this.processiFrames(document.body);
        }

        var tweets = document.body.getElementsByTagName('twitter-widget');
        //let htmltweets = '';
        for (var i=0;i<tweets.length;i++)
        {
            try {
                var root = tweets[i].shadowRoot;//.querySelector('blockquote');
                var content = this.extractTweets(root);
                //htmltweets += content;
                tweets[i].setAttribute('readeriframe',encodeURIComponent(content));
            } catch (etwitter) {
                //htmltweets += 'error with ' + etwitter;
            }
        }
        //res.tweets = htmltweets;
        // we need to remove hidden divs now because after we inject into another div, we don't have the info anymore
        // DONE (was a problem with CANVAS, see below) removed DIV because removes content from https://medium.com/the-javascript-collection/html-wasnt-made-for-apps-59f870dfc075
        // remove A because getBoundingClientRect() can return 0,0 sometimes, like fish image in reason.com/blog
        // (a for 'prev' from independent.co.uk)
        //document.querySelectorAll('img').forEach(i => {if (i.getBoundingClientRect().width < MIN_WIDTH) //i.setAttribute('readerhidden','smallimage');});
        var toremove = ['article','div','section','p','ol','ul','span','h1','h2','h3','h4'];
        for (var i=0;i<toremove.length;i++)
            this.markHidden(toremove[i],document.body);
        // v1.4 make all links absolute
        var links = document.body.getElementsByTagName('a');
        for (var i=0;i<links.length;i++)
        {
            if (links[i].hasAttribute('href'))
                links[i].href = links[i].href;
            if (links[i].style && (links[i].style.display=='none' || links[i].style.visibility=='hidden'))
            {
                links[i].parentNode.removeChild(links[i]);
                i--;
            }
        }


        //4.9
        /*3.0this.removeAllClasses(anypositionList,document.body,false,true,true);
        this.removeAllClasses(classNamesList,document.body,false,true);
        this.removeAllClasses(wholeClassNamesList,document.body,true,true);
        this.removeAllWithAttributes(attributesToRemove,document.body,true);
        this.removeExactClassNames(exactClassNamesList,document.body,true);*/

        document.querySelectorAll('img').forEach(i => {
          let rect = i.getBoundingClientRect();
          if (rect.width < MIN_WIDTH && rect.height < MIN_HEIGHT)
          {
            i.setAttribute('readerhidden','smallimage');
          }
          else
          {
            i.setAttribute('originalw',rect.width);
            i.setAttribute('originalh',rect.height);
          }
        });

        document.querySelectorAll('amp-youtube').forEach(v => {
          let youtubeid = v.dataset.videoid;
          let a = document.createElement('a');
          a.className = 'videobox';
          a.href = 'http://youtube.com/watch?v=' + youtubeid;
          let img = document.createElement('img');
          img.width = 320;
          img.src = 'http://img.youtube.com/vi/' + youtubeid + '/0.jpg';
          a.appendChild(img);
          v.parentNode.replaceChild(a,v);
        });

        var ampimgs = document.getElementsByTagName('amp-img');
        for (let i=0;i<ampimgs.length;)
        {
            let f = ampimgs[i];
            let src = f.getAttribute('src');
            let rect = f.getBoundingClientRect();
            if (rect.width < MIN_WIDTH && rect.height < MIN_HEIGHT)
            {
                f.setAttribute('readerhidden','smallampimage');
                i++;
            }
            else if (src > '')
            {
                let img = document.createElement('img');
                img.src = src;
                img.width = rect.width;
                img.setAttribute('originalw',rect.width);
                img.setAttribute('originalh',rect.height);
                f.parentNode.replaceChild(img,f);
            }
            else
                i++;
        }

        ampimgs = document.getElementsByTagName('amp-anim');
        for (let i=0;i<ampimgs.length;)
        {
            let f = ampimgs[i];
            let src = f.getAttribute('src');
            let rect = f.getBoundingClientRect();
            if (rect.width < MIN_WIDTH && rect.height < MIN_HEIGHT)
            {
                f.setAttribute('readerhidden','smallampimage');
                i++;
            }
            else if (src > '')
            {
                let img = document.createElement('img');
                img.src = src;
                img.width = rect.width;
                img.setAttribute('originalw',rect.width);
                img.setAttribute('originalh',rect.height);
                f.parentNode.replaceChild(img,f);
            }
            else
                i++;
        }

        var headerData = this.findHeaderInBodyImages(maxHeight,scrollTop);
        var headerSize = headerData.headerSize;
        var headerImage = headerData.headerImage;
        var tagnames = ['div','section','header','span','figure'];//3.7 added figure for aeon.co/essays/how-a-medieval-mystic-was-the-first-creator-of-fanfiction
        for (var i=0;i<tagnames.length;i++)
        {
            var data = this.keepBackgroundImages(tagnames[i],document.body,maxHeight,headerSize,headerImage,scrollTop);
            headerImage = data.image;
            headerSize = data.size;
        }

        /*if (!headerImage)
        {
            var metaImages = this.getMetaImages();
            if (metaImages.length >0)
                headerImage = metaImages[0].src;
        }*/
        res.headerimage = headerImage?headerImage:'';

        //3.0 moved before getting header images because we don't want to select an image from a later hidden element
        /*//2.4
        this.removeAllClasses(anypositionList,document.body,false,true,true);
        this.removeAllClasses(classNamesList,document.body,false,true);
        this.removeAllClasses(wholeClassNamesList,document.body,true,true);
        this.removeAllWithAttributes(attributesToRemove,document.body,true);*/


        // 2.4: from other app, tweets might not be rendered as IFRAMEs yet
        // so we pick up their content here
        var blocks = document.body.getElementsByClassName('twitter-tweet');
        for (var i=0;i<blocks.length;i++)
        {
            if (blocks[i].hasAttribute('original'))
                continue;
            {
                var b = blocks[i];
                var p = b.getElementsByTagName('p')[0];
                if (!p)
                    continue;
                var pcontent = p.outerHTML;
                p.parentNode.removeChild(p);
                var header = b.firstChild ? b.firstChild.textContent:''; //3.5
                header = header.replace(/—/g,'');
                header = header.replace(/\((@\S+)\)/,'$1'); // remove ( ) around twitter handle
                b.innerHTML = '<div>' + header + '</div>' + pcontent;
                b.setAttribute('original',encodeURIComponent(b.innerHTML));
            }
        }

        // 2.4: from other app, instagram-media might not be rendered as IFRAMEs yet
        // so we pick up their content here
        var instagrams = document.body.getElementsByClassName('instagram-media');
        for (var i=0;i<instagrams.length;i++)
        {
            var b = instagrams[i];
            var links = b.getElementsByTagName('a');
            if (links.length>0)
            {
                var href = links[0].href;
                var img = document.createElement('img');
                img.className = 'instagram-media';//2.4
                img.width = 306;
                img.height = 306;
                img.src = 'http://api.instagram.com/oembed?url=' + href;
                b.parentNode.replaceChild(img,b);
                i--;
            }
        }

        this.markDIVBackgroundImages('div',document.body);
        this.markDIVBackgroundImages('li',document.body);//get images in techcrunch.com/2015/11/20/facebook-at-work-gets-its-own-version-of-messenger-with-debut-of-work-chat/

        var canvas = document.body.getElementsByTagName('canvas');
        var canvasimages = {};
        for (var i=0;i<canvas.length;i++)
        {
            try {
            var img = document.createElement('img');
            img.src = canvas[i].toDataURL();
            img.width = canvas[i].width;
            img.height = canvas[i].height;
            canvasimages[i] = img;
            }catch(edomexception){}
        }

        var figs = document.querySelectorAll('figure');
        figs.forEach(f => {
           var imgs = f.querySelectorAll('img');
           var img = imgs[imgs.length-1];
           var caption = f.querySelector('figcaption');
           var text = '';
           if (caption)
              text = caption.textContent;
           if (img && !img.getAttribute('readerhidden'))
           {
              f.innerHTML = '<img width=320 src="' + this.getLazySrc(img) + '"/><figcaption>' + text + '</figcaption>';
            //f.innerHTML = '<div>text for me is ' + this.getLazySrc(img) + ' for the figure</div>';

           }
        });


        //params.completionFunction(res);
        //return;

        var div = document.createElement('div');
        // 1.9 fix for about.com

        var foundArticle = false;
        var winner = null;
        var maxLength = -1;
        var winningClassname = null;
        for (var i=0;i<articleSelectors.length;i++)
        {
            var classname = articleSelectors[i];
            let elem = document.querySelector(classname);
            if (elem)
            {
                let lenTextContent = elem.textContent.length;
                if (lenTextContent > 3000)
                {
                    winningClassname=classname;
                    maxLength = lenTextContent;
                    winner = elem;
                    break;
                }
                if (lenTextContent > maxLength)
                {
                     winningClassname=classname;
                    maxLength = lenTextContent;
                    winner = elem;
                }
            }
        }
        if (winner && maxLength > 300)
        {
            foundArticle = true;
            //div.innerHTML = 'articleselector:' + winningClassname + '=' + winner.innerHTML;
            div.innerHTML = winner.innerHTML;
            if (document.querySelector('.insert-image img'))
                res.headerimage = document.querySelector('.insert-image img').src;
        }

        /*for (var i=0;i<articleSelectors.length;i++)
        {
            var classname = articleSelectors[i];
            if (document.querySelector(classname))
            {
                div.innerHTML = classname + ':' + document.querySelector(classname).innerHTML;
                if (document.querySelector('.insert-image img'))
                    res.headerimage = document.querySelector('.insert-image img').src;
                foundArticle = true;
                break;
            }
        }*/
        if (!foundArticle)
        {
            var articles = document.body.getElementsByTagName('article');
            var qz = window.location.hostname.indexOf('qz.com') != -1;
            if (articles.length == 1 || (articles.length>=1 && qz))
            {
                if (articles[0].textContent.length > 300) // nasa.gov/feature/shoot-the-supermoon-eclipse-like-a-pro
                    div.innerHTML = articles[0].innerHTML;
                else
                    div.innerHTML = document.body.innerHTML;
            }
            else
            {
                // 4.5 for https://www.supercellfan.it/clash-royale/migliori-combo-clash-royale-2017/
                if (window.location.hostname.indexOf('supercellfan') != -1 && document.querySelector('.entry-content'))
                    div.innerHTML = document.querySelector('.entry-content').innerHTML;
                else if (window.location.hostname.indexOf('scarymommy.com') != -1 && document.querySelector('.article-inner'))
                    div.innerHTML = document.querySelector('.article-inner').innerHTML;
                else if (window.location.hostname.indexOf('unesco.org') !== -1 && document.querySelector('#news_content'))
                    div.innerHTML = document.querySelector('#news_content').innerHTML;
                else if (window.location.hostname.indexOf('theregister.co.uk') !== -1 && document.querySelector('#article'))
                    div.innerHTML = document.querySelector('#article').innerHTML;
                // 4.6
                else if (window.location.href.indexOf('mscroggs.co.uk/blog') != -1 && document.querySelector('.blart'))
                    div.innerHTML = document.querySelector('.blart').innerHTML;
                // 4.7
                else if (window.location.href.indexOf('theindychannel.com') != -1 && document.querySelector('.module--story'))
                    div.innerHTML = document.querySelector('.module--story').innerHTML;
                // 4.7
                else if (window.location.href.indexOf('healthline.com') != -1 && document.querySelectorAll('article').length > 1)
                    div.innerHTML = document.querySelectorAll('article')[1].innerHTML;
                // 4.9
                else if (window.location.href.indexOf('blogs.harvard.edu') !== -1 && document.querySelector('#content'))
                    div.innerHTML = document.querySelector('#content').innerHTML;
                // 5.0
                else if (window.location.href.indexOf('.liberal.gr') !== -1 && document.querySelector('.item-body'))
                {
                    //div.innerHTML = document.querySelector('.article_content').innerHTML;
                    div.innerHTML = document.querySelector('.item-body').innerHTML;
                }
                else
                    div.innerHTML = document.body.innerHTML;
            }
        }

        if (window.location.hostname.indexOf('.clarity.fm') != -1)
        {
            var post = document.querySelector('.post');
            if (post)
                div.innerHTML = post.innerHTML;
        }
        // 3.2 fastcompany.com
        if (window.location.hostname.indexOf('fastcompany.com') != -1)
        {
            var infinitescroll = document.querySelectorAll('article[class*="-infinite-scroll"]');
            if (infinitescroll.length >= 1)
                div.innerHTML = infinitescroll[0].innerHTML;
            else
            {
                var postmain = document.querySelector('.post__main');
                if (postmain)
                    div.innerHTML = postmain.innerHTML;
            }
        }

        // 3.2 FORTUNE.COM
        if (window.location.hostname.indexOf('fortune.com') != -1)
        {
            var fortune = document.querySelectorAll('article[class*="current"]');
            if (fortune.length === 1)
                div.innerHTML = fortune[0].innerHTML;
        }
        //LILI
        if (window.location.hostname.indexOf('lwn.net') != -1)
        {
            this.removeAll('table',div);
            this.removeExactClassNames(['PageHeadline','topnav-container'],div);
        }
        //res.fulltext = div.innerHTML;
        //params.completionFunction(res);
        //return;

        // 3.8 musculation.ooreka.fr/fiche/voir/178470/bien-muscler-ses-epaules
        if (window.location.hostname.indexOf('.ooreka.fr') != -1)
        {
            var article = document.querySelector('.article');
            if (article)
                div.innerHTML = article.innerHTML;
        }

        this.removeMarkedHidden('*',div);//2.9 economist.com Comments (135)

        if (window.location.hostname.indexOf('rssing.com') != -1)
        {
            var articles = document.getElementsByClassName('itembody');
            if (articles.length > 0)
                div.innerHTML = '';
            for (var i=0;i<articles.length;i++)
            {
                var article = document.createElement('div');
                article.innerHTML = articles[i].innerHTML;
                div.appendChild(article);
            }
        }

        // 4.9
        if (window.location.hostname.indexOf('thehill.com') != -1)
        {
            var section = document.body.querySelector('#node-content-container');
            if (section)
                div.innerHTML = section.innerHTML;
        }

        //2.4 added 'role'=='banner' somewhere else this.removeWithRules(div);

        // detect amp-images
        if (window.location.hostname.indexOf('bbc.com') !== -1)
        {
            this.removeAll('header',div);
        }

        // v1.4 detect facebook videos
        var divs = div.getElementsByTagName('div');
        for (var i=0;i<divs.length;i++)
        {
            if (divs[i].hasAttribute('data-store'))
            {
                try {
                    var o = JSON.parse(divs[i].getAttribute('data-store'));
                    if (o.type && o.type=='video')
                    {
                        var src = mydecode(o.src);
                        var a = document.createElement('a');
                        a.className = 'videobox';
                        a.href = src;
                        a.innerHTML = PLAY_VIDEO;
                        divs[i].parentNode.replaceChild(a,divs[i]);
                        i--;
                    }
                }
                catch (e) {}
            }
        }

        // check old pages with frameset
        var frames = document.getElementsByTagName('frame');
        if (frames.length >= 1)
        {
            div.innerHTML = 'This page has multiple FRAMEs.<BR>Go to <a href="' + frames[0].src + '">' + frames[0].src + '</a> to view a readable version of this page.';
            res.dontsave = 'true';
            res.redirect = frames[0].src;
            params.completionFunction(res);
            return;
        }

        if (document.querySelectorAll('iframe').length > 0 && document.querySelectorAll('iframe')[0].getAttribute('aria-label') === 'Post')
        {
            var src = document.querySelectorAll('iframe')[0].src;
            div.innerHTML = 'This page has multiple FRAMEs.<BR>Go to <a href="' + src + '">' + src + '</a> to view a readable version of this page.';
            res.dontsave = 'true';
            res.redirect = src;
            params.completionFunction(res);
            return;
        }
        // 4.5 for https://qotoqot.com/blog/improving-focus/
        try {
            var footers = Array.from(div.querySelectorAll('section.footer'));
            footers.forEach(function(a){a.parentElement.removeChild(a)});
        } catch (efooters) {}
        this.removeEmptyLinks(div);//2.9
        this.removeEmptyTables(div);//2.9
        this.removeTablesWithLinks(div);//2.9
        this.unwrapLongLI(div);//2.9

        if (KEEP_LOCAL_IFRAMES)
        {
            var iframes = div.getElementsByTagName('iframe');
            for (var i=0;i<iframes.length;)
            {
                if (iframes[i].hasAttribute('readeriframe'))
                {
                    var newdiv = document.createElement('div');
                    newdiv.innerHTML = mydecode(iframes[i].getAttribute('readeriframe'));
                    iframes[i].parentNode.replaceChild(newdiv,iframes[i]);
                }
                else
                    i++;
            }
        }

        div.querySelectorAll('twitter-widget').forEach(t => {
          if (t.hasAttribute('readeriframe'))
          {
            let newdiv = document.createElement('div');
            newdiv.innerHTML = mydecode(t.getAttribute('readeriframe'));
            t.parentNode.replaceChild(newdiv,t);
          }
        });
        //8.1 for code duplicated https://redstapler.co/remove-person-from-video-ai-javascript/
        div.querySelectorAll('*').forEach((item, i) => {
          if (item.style && item.style.display === 'none')
            item.parentElement.removeChild(item);
        });

        this.removeMarkedHidden('*',div);//2.4

        this.replaceDIVBackgroundImages('div',div);
        this.replaceDIVBackgroundImages('li',div);

        //this.removeAll('embed',div);
        //this.removeAll('textarea',div);
        this.removeAllComments(div);
        this.removeAll('fieldset',div);//2.5
        this.removeAll('ins',div);//2.5
        this.removeAll('time',div);
        this.removeAll('link',div);
        this.removeAll('style',div);
        this.removeAll('script',div);//https://blog.mozilla.org/blog/2014/11/03/the-first-browser-dedicated-to-developers-is-coming/
        this.removeAll('article-promo',div);//2.6
        this.removeAmp(div);
        this.removeAll('footer',div);
        this.removeAll('aside',div);//4.1

        this.removeAll('noscript',div);//2.4 because medium.com/startup-study-group/independent-music-is-big-really-really-big
        // 2.9 added back removing noscript directly because adds broken HTML
        // e.g. mobile.nytimes.com/2016/02/28/magazine/what-google-learned-from-its-quest-to-build-the-perfect-team.html
        // end popsci.com/edward-snowden-internet-is-broken
        /*var noscript = div.getElementsByTagName('noscript');
        for (var i=0;i<noscript.length;)
        {
            try {
                // cool trick from http://stackoverflow.com/questions/3700326/decode-amp-back-to-in-javascript
                var encoded = noscript[i].innerText;
                var elem = document.createElement('textarea');
                elem.innerHTML = encoded;
                var decoded = elem.value;
                noscript[i].outerHTML = decoded;
            } catch (e) {i++}
        }*/
        this.removeAll('button',div);


        //var forms = document.getElementsByTagName('form');
        this.removeAll('input',div);
        this.removeAll('xmp',div);//5.6
        this.removeAll('label',div);
        this.removeAll('textarea',div);
        //this.removeAll('form',div);//the whole article is inside a FORM blogs.msdn.com/b
        //this.removeAll('header',div);
        //this.removeAll('a',div);
        //this.removeAll('svg',div);
        this.removeAll('small_2',div); // mobihealthnews.com/43254/weight-watchers-digital...

        this.removeDataURI('embed',div);
        this.removeDataURI('a',div);


        var canvas = div.getElementsByTagName('canvas');// DONE (yes) should be 'canvas', not 'DIV'
        var idx = 0;
        for (var i=0;i<canvas.length;)
        {
            if (canvasimages[idx])
                canvas[i].parentNode.replaceChild(canvasimages[idx],canvas[i]);
             else
                 i++;
            idx++;
        }


        div.querySelectorAll('.wistia_embed').forEach(w => {
          w.parentElement.removeChild(w);
        });
        div.querySelectorAll('svg').forEach((svg,idx) => {
          try {
              if (svg.getAttribute('svgimgcontent'))
                  svg.outerHTML = `<code class='svg'>${svg.getAttribute('svgimgcontent')}</code>`;
              else
                  svg.parentElement.removeChild(svg);
          } catch (e) {}
        });

        var images = div.getElementsByTagName('img');
        for (var i=0;i<images.length;)
        {
            if (images[i].className === 'svg')
                         {
                            images[i].width = 320;
                            images[i].height = 240;
                            i++;
                         }
                         else
                         {
                            var src = this.getLazySrc(images[i]);
                            if (!this.keepImageByUrl(src))
                                images[i].parentNode.removeChild(images[i]);
                            else
                            {
                                images[i].src = src;
                                images[i].width = 320;
                                images[i].height = 240;
                                i++;
                            }
                         }
        }

                         //params.completionFunction(res);
                         //return;

        var videos = div.getElementsByTagName('video');
        var videoimageurls = [];
        for (var i=0;i<videos.length;)
        {
            var src = null;
            if (videos[i].hasAttribute('src'))
                src = videos[i].src;
            else
            {
                var sources = videos[i].getElementsByTagName('source');
                for (var s=0;s<sources.length;s++)
                {
                    var source = sources[s];
                    if (!src || src.indexOf('.mp4') === -1)
                        src = source.src;
                    // 2.4 remove test because not good: hard to know what the urls look like
                    //if (source.hasAttribute('type') && source.getAttribute('type').indexOf('mp4')!=-1)
                    //    break;
                }
            }
            if (!src || !this.keepImageByUrl(src)) // 3.6 added keepImageByUrl to filter out wibbitz
            {
                videos[i].parentNode.removeChild(videos[i]);
            }
            else
            {
                var a = document.createElement('a');
                a.className = 'videobox';
                a.href = src;
                var poster = videos[i].getAttribute('poster');
                if (poster)
                {
                    a.innerHTML = '<img width=320 height=240 src="' + poster + '"/>';//3.3 + PLAY_VIDEO;
                }
                else
                    a.innerHTML = PLAY_VIDEO;

                videos[i].parentNode.replaceChild(a,videos[i]);
            }
        }


        // remove images if they have already been used as a video poster
        // TODO: error: WITH http://uk.businessinsider.com/the-roman-originals-black-and-blue-dress-2015-2?r=US
        var images = div.getElementsByTagName('img');
        for (var i=0;i<images.length;)
        {
            if (images[i].hasAttribute('videoposter'))
            {
                i++;
                continue;
            }
            var found = false;
            for (var j=0;j<videoimageurls.length;j++)
            {
                if (videoimageurls[j] == images[i].src)
                {
                    found = true;
                    break;
                }
            }
            if (found)
                images[i].parentNode.removeChild(images[i]);
            else
            {
                i++;
            }
        }


        this.removeAllClasses(wholeClassNamesList,div,true,false);//2.5 to remove elements that might contain videos that we don't care about, 2.9 markhidden=false
        this.removeNonVideo('iframe',div);
        this.removeNonVideo('embed',div);
        this.removeNonVideo('object',div);


        // for https://www.mongodb.com/blog/post
        var forms = div.getElementsByTagName('form');
        for (var i=0;i<forms.length;i++)
        {
            if (forms[i].hasAttribute('class') && forms[i].getAttribute('class').indexOf('mktoForm')!=-1)
            {
                forms[i].parentNode.removeChild(forms[i])
                i--;
            }
            else if (forms[i].textContent.length < 2000)//3.5 lowered for pleasetech.com/cartoons.aspx
            {
                forms[i].parentNode.removeChild(forms[i])
                i--;
            }
        }

        var youtubeImages = [];
        var boxes = div.getElementsByClassName('videobox');
        for (var i=0;i<boxes.length;i++)
        {
            if (boxes[i].hasAttribute('youtubeid'))
                youtubeImages.push(boxes[i].getAttribute('youtubeid'));
            else if (boxes[i].href > '' && boxes[i].href.indexOf('instagram.com') > 0)
            {
                boxes[i].outerHTML = '<img width=320 height=240 src="https://api.instagram.com/oembed/?url=' + boxes[i].href + '"/>';
                i--;
            }
        }

        var images = div.getElementsByTagName('img');
        var dupbyalt = {};
        var isMedium = window.location.hostname.indexOf('medium.com') != -1;
        for (var i=0;i<images.length;i++)
        {
            var src = null;
            var w = images[i].width;
            var h = images[i].height;
            images[i].src = images[i].src;
            src = images[i].src;
            var removed = false;
            if (images[i].hasAttribute('youtubeid'))
            {
                var ytid = images[i].getAttribute('youtubeid');
                if (youtubeImages.indexOf(ytid) != -1)
                {
                    images[i].parentNode.removeChild(images[i]);
                    i--;
                    removed = true;
                }
            }
            //2.5: remove image if one is found with same ALT
            // e.g. http://www.theverge.com/2016/1/6/10718282/internet-bots-messaging-slack-facebook-m
            if (!removed)
            {
                var alt = images[i].getAttribute('alt');
                var lastpath = src.substring(src.lastIndexOf('/')+1);
                if (alt && alt>'' && alt.length > 4)
                {

                    if (dupbyalt[alt] == lastpath)
                    {
                        images[i].parentNode.removeChild(images[i]);
                        i--;
                        removed = true;
                    }
                    else
                        dupbyalt[alt] = lastpath;
                }
            }
            //if (!removed && isMedium && w<=75 && src && src.indexOf('data')==0)
            if (!removed && isMedium && src && src.indexOf('data')==0)
            {
                images[i].parentNode.removeChild(images[i]);
                i--;
            }
            else if (src && this.sameImageURL(src,res.headerimage))
               res.headerimage = src;
        }

        // get rid of tag lists containing several | | |
        // e.g. http://mobihealthnews.com/43254/weight-watchers-digital-acquisition-spree-continues-with-purchase-of-fitness-startup-hot5/
        var small = div.getElementsByTagName('small');
        for (var i=0;i<small.length;i++)
        {
            var text = small[i].textContent;
            if (text.split('|').length > 3)
            {
                small[i].parentNode.removeChild(small[i]);
                i--;
            }
        }

        this.removePrintMedia(div);


        // important to put here too, because some carousel was not removed from Techcrunch
        // e.g. http://techcrunch.com/video/facebook-notify-app-demo/519236113/
        this.removeAllClasses(anypositionList,div,false,false,true);
        this.removeAllClasses(classNamesList,div,false);
        this.removeAllClasses(wholeClassNamesList,div,true);
        this.removeAllWithAttributes(attributesToRemove,div);
        this.removeExactClassNames(exactClassNamesList,div);
        removeSelectors.forEach(s => {div.querySelectorAll(s).forEach(d => d.parentNode.removeChild(d))});


        // fixes problem with medium.com/@medialab/why-there-are-so-many-video-lectures-in-online-learning
        var sections = div.getElementsByTagName('section');
        for (var i=0;i<sections.length;)
            sections[0].outerHTML = sections[0].innerHTML;

        // fixes problem with http://fokus.dn.se/edward-snowden-english
        sections = div.getElementsByClassName('section');
        for (var i=0;i<sections.length;)
            sections[0].outerHTML = sections[0].innerHTML;

        // 2.8: https://m.signalvnoise.com/is-group-chat-making-you-sweat-744659addf7d
        sections = div.getElementsByClassName('section-content');
        for (var i=0;i<sections.length;)
            sections[0].outerHTML = sections[0].innerHTML;

        // 3.8: http://www.womenshealthmag.com/beauty/witch-hazel-beauty-benefits
        sections = div.getElementsByClassName('article-section');
        for (var i=0;i<sections.length;)
            sections[0].outerHTML = sections[0].innerHTML;

        // 3.8: http://www.jakob-aungiers.com/articles/a/LSTM-Neural-Network-for-Time-Series-Prediction
        sections = div.getElementsByTagName('h1');
        for (var i=0;i<sections.length;)
        {
            if (sections[i].textContent.length === 0)
                sections[i].outerHTML = sections[i].innerHTML;
            else
                i++;
        }

        this.removeIdAttribute('*',div);
        // 1.8: don't remove allAttributes otherwise junk here:
        // http://www.lightreading.com/spit-%28service-provider-it%29/webrtc/twilio-adds-webrtc-powered-video-support/d/d-id/715010
        //this.removeAllAttributes('*',div);

        this.removeNodeText(div); //2.8

        this.makeGalleries('multimedia-gallery__list',div);
        this.makeGalleries('el__gallery',div);
        this.makeGalleries('carousel',div);
        this.makeGalleries('slideshow',div);
        this.makeGalleries('image-links',div);
        this.makeGalleries('js-gallery-aspect-ratio-wrapper',div);
        this.makeGalleries('el-carousel__wrapper',div);
        this.makeGalleries('related-slideshow',div);

        // remove NOBR multithreaded.stitchfix.com/blog/2015/09/17/deep-style/
        var nobr = div.getElementsByTagName('nobr');
        for (var i=0;i<nobr.length;)
        {
            nobr[i].outerHTML = nobr[i].innerHTML;
        }

        // remove empty DIVs medium.com/a-startup-hustlers-guide/ios-8-photos-freak-out-f9072a8179c6
        var divs = div.getElementsByTagName('div');
        for (var i=0;i<divs.length;)
        {
            if (divs[i].getElementsByTagName('img').length==0 && divs[i].textContent.length == 0)
                divs[i].parentNode.removeChild(divs[i])
            else
                divs[i].outerHTML = divs[i].innerHTML; // 3.8 http://m.studylight.org/commentaries/bnb/psalms-2.html
        }

        var forms = div.getElementsByTagName('form');
        var removeformsWithActions = ['comment','prodsearch.cfm'];
        for (var i=0;i<forms.length;i++)
        {
            if (forms[i].hasAttribute('action'))// && forms[i].getAttribute('action').toLowerCase().indexOf('comment') != -1)
            {
                var action = forms[i].getAttribute('action').toLowerCase();
                var removeForm = false;
                for (var j=0;j<removeformsWithActions.length;j++)
                {
                    if (action.indexOf(removeformsWithActions[j]) != -1)
                    {
                        removeForm = true;
                        break;
                    }
                }
                if (removeForm)
                {
                    forms[i].parentNode.removeChild(forms[i]);
                    i--;
                }
            }
        }

        // remove duplicate images
        // 6.8 no!!! this removes links that wrap IMG tag with the same src as the href of the link, e.g. stratechery.com/2019/shopify-and-the-power-of-platforms
        /*var images = div.querySelectorAll('img');
        var imagelinks = [];
        images.forEach(i => imagelinks.push(i.src));
        var links = div.querySelectorAll('a');
        links.forEach(l => {
          if (imagelinks.indexOf(l.href) !== -1)
          {
            l.parentElement.removeChild(l);
          }
        });*/
        //3.6 for duplicate images in bloomberg
        // remove dup images that were unwarped from NOSCRIPT and PICTURE in m.spiegel.de
        var images = div.querySelectorAll('img');
        var imageslinks = [];
        images.forEach(l => {
          let idx = imageslinks.indexOf(l.src);
          if (idx !== -1)
          {
           l.parentElement.removeChild(l);
          }
          imageslinks.push(l.src);
        });
        //this.reduceDataImages(div);
        //this.replacePRE(div);
        this.makeBlockImages(div);
        //this.removeSimilarImages(div);
        this.unwrapLongBlockQuotes(div);
        this.removeCopyrightFigCaption(div);



        /*let videourls = [];
        div.querySelectorAll('.videobox').forEach(v => {
          if (videourls.indexOf(v.src) !== -1)
            v.parentElement.removeChild(v);
          else
            videourls.push(v.src);
        });*/
        //res.imagelinks = imageslinks;
        var html = div.innerHTML;
        html = html.replace(/&nbsp;/g,' ');
        if (html.trim().length == 0 && document.getElementsByTagName('frame').length>0)
        {
            html = 'Article not found because this page has FRAME elements. Sorry!';
            res.dontsave = 'true';
        }
        res.fulltext = html;
    } catch (e) {
        try {
            if (!document.body)//3.0 some urls don't contain 'pdf' && window.location.href.toLowerCase().indexOf('pdf') != -1)
            {
                res = {error:'No support for PDF yet'};
                res.isPDF = true;
                res.redirect = res.url;
            }
            else
                res = {error: e.toString()};
        }
        catch (e2) {
            res = {error: e2.toString()};
        }
    }

    if (res.headerimage && res.headerimage.indexOf('//') === 0)
        res.headerimage = document.location.protocol + res.headerimage;
    this.removeHeaderImageIfAlreadyAnImage(div,res);
    this.removeAllAttributes('*',div);
    params.completionFunction(res);
},

finalize: function(params) {
    // This method is run after the native code completes.
    if (params)
    {
        if (params.error)
            alert(params.error);
        else if (params['goto'])
            window.location.href = params['goto'];
    }
},


testUrlForMedia:function(pastedData) {
    // 3.8 to get rid early of googlesyndication and other video ads
    if (!this.keepImageByUrl(pastedData))
        return false;
    var success = false;
    var media   = {};

    var id = this.getQueryParam('id',pastedData);//"youtube-video-z47Gv2cdFtA"
    if (id && id.indexOf('youtube-video-') == 0)
    {
        media.type  = "youtube";
        media.id    = id.substring('youtube-video-'.length);
        media.poster = 'http://img.youtube.com/vi/' + media.id + '/0.jpg';
        media.url = 'http://www.youtube.com/watch?v=' + media.id;
        success = true;
    }
    else if (pastedData.match('//(www.)?youtube|youtu\.be')) {
        //var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        var r = pastedData.match(rx);
        if (r && r[1] && r[1].match(/[a-zA-Z0-9_-]{11}/))// && pastedData.indexOf('list=') === -1)
        {
            media.type  = "youtube";
            media.id    = r[1].substring(0,11);
            media.poster = 'http://img.youtube.com/vi/' + media.id + '/0.jpg';
            media.url = 'http://www.youtube.com/watch?v=' + media.id;
            success = true;
        }
    }
    else if (pastedData.match('(player.)?vimeo\.com')) {
        vimeo_id = pastedData.split(vimeo_regexp)[1].split(/[?&]/)[0];
        media.type  = "vimeo";
        media.id    = vimeo_id;
        media.url = 'http://player.vimeo.com/video/'+media.id;
        media.poster = 'https://vimeo.com/api/oembed.json?url=' + media.url;//'getasynch';
        success = true;
    }
    else if (pastedData.indexOf('vine.co')!=-1) {
        media.type  = "vine";
        media.url = pastedData;
        media.poster = 'http://vine.co/oembed.json?url=' + media.url;//'getasynch';
        success = true;
    }
    else if (pastedData.match('dailymotion\.com')){
        var m = pastedData.match(dailymotion_regexp);
        if (m)
        {
            media.id = m[2];//m[5]||m[3];
            media.type = 'dailymotion';
            media.url = 'http://www.dailymotion.com/video/' + media.id;
            media.poster = 'http://www.dailymotion.com/thumbnail/video/' + media.id;
            success = true;
        }
    }
    if (success)
        return media;
    else
        return false;
},

getBackgroundImage: function(elem){
    var bgimage = getComputedStyle(elem).backgroundImage;
    if (!bgimage)
        return null;
    var matches = bgimage.match(/(url\((\S+)\))/gi);
    if (!matches)
        return null;
    for (var m=0;m<matches.length;m++)
    {
        var match = matches[m];
        if (match.indexOf('url') != -1)
        {
            var urlimage = match.slice(4,-1);
            urlimage = urlimage.replace(/"/g,'');
            return urlimage;
        }
    }
    return null;
},

};

/*var ExtensionPreprocessingJS = new LoloAction;

function runFromWebView(){
    var params = {
        completionFunction: function (res) {
            window.webkit.messageHandlers.done18.postMessage(res);
        }
    }
    ExtensionPreprocessingJS.run(params);
}*/
