# Changelog

## 0.2.1

*May 6, 2015*

- Require the new ParagraphBlock component.


## 0.2.0

*May 6, 2015*

- Change Paragraph component markup to render <tr> with single <td>.
- Implement ParagraphBlock component that accepts only Paragraph children.
- Move the height property from any component that exposed it or tried to set it on a <table>.
- Add width and height properties to <td> elements (i.e. wrappers) for any compnent where it makes sense.
- Add className to <tr> when rendering a ListItem without a bullet.


## 0.1.16

*May 6, 2015*

- Revert back to original markup for the Button component. The root issue was mangled conditional if blocks for Outlook.


## 0.1.15

*May 6, 2015*

- Change the closing `</v:roundrect>` to `</v:rect>` to resolve Outlook rendering issues with the Button component.


## 0.1.14

*May 6, 2015*

- Change the token %color% to %textColor% in the Button component.


## 0.1.13

*May 6, 2015*

- Update Outlook conditional markup for Button component.


## 0.1.12

*May 6, 2015*

- Update Outlook conditional markup for Button component.


## 0.1.11

*May 5, 2015*

- Resolve issue with checking child.type.displayName instead of child.type when determining if <img> occurs first.


## 0.1.10

*May 5, 2015*

- Resolve issue with not passing children to applyChildMask() in MediaObject component.
- Update applyChildMask() to check child.type and child.type.displayName.


## 0.1.9

*May 5, 2015*

- Use align property to render() Paragraph.


## 0.1.8

*May 5, 2015*

- Add key to children of Button component.
- Add key to children of MediaObject component.
- Remove deprecated JS files.


## 0.1.7

*May 5, 2015*

- Require the Paragraph component in the mighty mail module entry point.


## 0.1.6

*May 5, 2015*

- Remove the paragraph.less file.
- Add width and height properties to Paragraph.
- Set default value Paragraph of align property to "left".


## 0.1.5

*May 5, 2015*

- Remove the grid.less file.


## 0.1.4

*May 5, 2015*

- Add styles to set images to inline-block when using any horizontal alignment properties.


## 0.1.3

*May 5, 2015*

- Build the JSX into JS.
- Add require for gulp-react in gulpfile.


## 0.1.2

*May 5, 2015*

- Add %subject% token in the <title> element.


## 0.1.1

*May 4, 2015*

- Replace $ prefixed variables in responsive.less.
- Rename the Frame in the template to Wrapper.
- Wrap the %styles% token in template.html with <style> tags.