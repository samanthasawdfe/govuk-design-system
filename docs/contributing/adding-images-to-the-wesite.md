# Adding images to the design system website
When adding or amending guidance on the design system website and you want to add an image, it's important to be considerate of the impact images have on the website. They can have implications for web performance and accessibility if used improperly.

Before reading the following, also consult our [image guidance](https://design-system.service.gov.uk/styles/images/) for details on when it's appropriate to use images and how best to use them.

## Does your content really need images?
Generally, we would avoid adding new images to our content.

In patterns and components, we should be using code examples when we want to convey what our pattern or component will look like. Avoid using screenshots of patterns or components wherever possible.

## Can your image be an SVG?
SVG's are usually better for web performance as they scale with different screen sizes and load faster than most image formats of the same size. If your image is a "graphic" (in other words it isn't a photo or a screenshot) it should be converted to an SVG and added to the page directly.

This doesn't however mean that SVG's can't also have a negative impact on performance if their file size is unnecessarily large. Consider using a compression service such as [SVGOMG](https://jakearchibald.github.io/svgomg/) to ensure your SVG is as performant as possible.

## Ensure your image is an appropriate file size
If your image can't or shouldn't be an SCG is instead a "standard" file type eg: PNG, JPEG etc, avoid adding very large file size images to the website.

The simplest way to avoid this is is to compress your images. There are numerous compression tools such as [ImageOptim](https://imageoptim.com/mac) which can handle this for you.

Another good practice is to ensure that your image is the appropriate dimensions. For example, if your image is going to sit within a width container or column on a page and you know that the maximum size your image will ever be, accounting for different screen sizes, is 500 pixels, your image's intrinsic size (its "actual" size) should reflect this. A good rule of thumb is for your image's intrinsic width to be double that of it's maximum width on the page. In the previous example, we would want our image to have a width of 1000px. This is to account for HiDPI (High Dots Per Inch) displays such as retina display macs where we lower pixel images may look blurry and hard to interpret. There are numerous tools for resizing images, such as within macOS's own image viewer.

Both these techniques are important to do, however be mindful that a properly compressed image that's too wide will be better than a poorly compressed image that's the correct width.

## Ensure that your image is marked up to improve web performance
If you have direct control over the markup of your image AKA: the `img` tag which is rendering it, try to include the following:

- [Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [The `figure` tag around your image](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
- [Responsive image features such as the `srcset` and `sizes` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [The `picture` tag for managing some of these technical techniques](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)

