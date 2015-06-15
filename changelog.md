# Changelog

## 2.0.4

*June 15, 2015*

- Add cell property to the Hero component and adjust how properties are applied to HTML.


## 2.0.3

*June 15, 2015*

- Remove padding on the hero__bg <td>.


## 2.0.3

*June 15, 2015*

- Remove padding on the hero__bg <td>.


## 2.0.2

*May 31, 2015*

- Add `!important` to `m-padding-none-` styles.


## 2.0.1

*May 31, 2015*

- Change order of `component` and `layout` styles so that layout has higher priority. All layout classes are used for overriding.
- Only remove padding left and right in nested Col components instead of all padding.


## 2.0.0

*May 23, 2015*

- Refactor component classes to follow BEM approach described [here](http://cssguidelin.es/#bem-like-naming).
- Update the "list-numbered" class to be "list--ordered".


## 1.1.3

*May 23, 2015*

- Refactor LESS and SASS styles to be more organized and follow the SMACSS approach to categorizing styles.


## 1.1.2

*May 22, 2015*

- Add logic in mixin() to remove properties if keys are set to null or undefined.
- Add logic in plucTdProps() and pluckTableProps() to only pluck properties that actually exist.
- Change order of mixin of Row wrapper properties so that the defaults can be overridden.
- Use RawHtml the following components: Table, ListeItem wrapper and Para wrapper.
- Add section describing the HTML entities to the Readme.
- Add section describing gotchas with React programming to the Readme.
- Add AMP to the list of exported entities.


## 1.1.1

*May 20, 2015*

- Add build task for auto generating component example documentation.
- Add mixins for shape properties such as wrapper on any component that has default values for such properites.
- Add logic to check the width and height of an Image component before loading the image from disk.


## 1.1.0

*May 16, 2015*

- Add OrderedList component.
- Rename list-numeric class to list-ordered.
- Add List.ORDERED constant (List.NUMERIC still exists for backward compatability).
- Add test for aliased component names. Can't actually alias bulitin HTML element names.


## 1.0.0

*May 15, 2015*

- Rename default-baseline.less to default-baselines.less.
- Pass wrapper property down to Container in the Frame component.
- Resolve Frame border not rendering in most Outlook clients.
- Add responsive styles for nested Frame components.
- Refactor MediaObject component to layout two Col components without using a conditional <td>.
- Update media object styles for imagery.
- Refactor the responsive styles for the Frame component.
- Add LT and GT entities.
- Modify default baselines for list items.
- Remove padding left on list-bullet-item class.
- Rename Paragraph to Para.
- Rename ParagraphBlock to ParaBlock.
- Normalize all properties so that `<table>` and `<td>` properties are defined the same and exposed consitently where appropriate.
- Deprecate BulletList, instead List sets bullet to BULL by default.
- Add support for numbered lists by setting the bullet property on a List to List.NUMERIC.
- Add CSS classes to remove padding.
- Rename CSS classes that remove padding when on mobile to be consistent with other padding classes.
- Add responsive styles for all imagery.
- Update test email to incorporate more components.
- Change CSS class names of Para and ParaBlock to be para, para-wrapper and para-block, para-block-wrapper respectively.
- Add responsive styles for Hero component.


## O.4.4

*May 11, 2015*

- Update the readme with rest of documentation.
- Add align property to Hero component.
- Update Outlook conditionls in Hero component to use fixed dimensions.
- Remove `wrapper.background` property from Container component.


## 0.4.3

*May 8, 2015*

- Update row-wrapper and list-item-wrapper styles so that the selectors don't use two classes on same element. This is not supported by Campaign Monitor's email inliner.
- Remove the code that sets the width of .row-wrapper in the Row component.
- Add readme file with partial documentation.



## 0.4.2

*May 8, 2015*

- Resolve $topline variable reference issue in default baselines stylesheet.
- Add return statement when cloning each Paragraph child in a ParagraphBlock.
- Correctly set className property instead of classNames property when cloning ListItem children in a List.
- Correctly set className property on retrieving `<table>` properties in a List.
- Add styles to remove baseline from first list item.


## 0.4.1

*May 8, 2015*

- Clone each Paragrah child in ParagraphBlock and ensure they each have keys.
- Clone the first and last Paragraph children to add the first-child and last-child class names.\


## 0.4.0

*May 8, 2015*

- Add support for Image components in MediaObjects.
- Add first-child and last-child classes to child Paragraph components within a ParagraphBlock.
- Add class name to `<tr>` for ListItem and Paragraph components.
- Add list-item-wrapper and list-bullet-wrapper classes to the `<td>` elements in Paragraph component.
- Add paragraph-wrapper class to `<td>` in Paragraph component.
- Expose itemWrapper and bulletWrapper properties on ListItem.
- Expose rowWrapper property on FullWidthRow.
- Update list styles.
- Add default baseline treatment styles for common components.


## 0.3.4

*May 7, 2015*

- Implement Image component that reads the image size automatically when width and height are not specified on the component.


## 0.3.3

*May 7, 2015*

- Update the calculation for arcsize in the Button component to ceil() after making a percent.


## 0.3.2

*May 7, 2015*

- Add borderColor and incorporate borderRadius in Outlook conditionals inside Button component.


## 0.3.1

*May 7, 2015*

- Resolve issue when calling getTdProps() in FullWidthRow() with undefined.


## 0.3.0

*May 7, 2015*

- Rename apply-child-mask.js to applyChildMask.js.
- Implement modules to pluck `<table>` properties from an object.
- Implement modules to pluck `<td>` properties from an object.
- Refactor all components to use the new pluck modules.
- Normalize properties for each component so that properties are predictable and all properties for `<table>` and `<td>` are exposed where it makes sense.
- Pass down the properties specified on the Col component nested within a MediaObject component.
- Support `<a>` or `<img>` child components in a MediaObject component.
- Export properites for the HTML entities NBSP, RSQUO, LSQUO, RDQUO, LDQUO, EMDASH, ENDASH, REG, TM and BULL.


## 0.2.2

*May 6, 2015*

- Change require path for applyChildMask() in ParagraphBlock to be the correct path.


## 0.2.1

*May 6, 2015*

- Require the new ParagraphBlock component.


## 0.2.0

*May 6, 2015*

- Change Paragraph component markup to render `<tr>` with single `<td>`.
- Implement ParagraphBlock component that accepts only Paragraph children.
- Move the height property from any component that exposed it or tried to set it on a `<table>`.
- Add width and height properties to `<td>` elements (i.e. wrappers) for any compnent where it makes sense.
- Add className to `<tr>` when rendering a ListItem without a bullet.


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

- Resolve issue with checking child.type.displayName instead of child.type when determining if `<img>` occurs first.


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

- Add %subject% token in the `<title>` element.


## 0.1.1

*May 4, 2015*

- Replace $ prefixed variables in responsive.less.
- Rename the Frame in the template to Wrapper.
- Wrap the %styles% token in template.html with `<style>` tags.
