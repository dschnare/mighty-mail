# Mighty Mail

Reactjs components for static server rendering of HTML emails.

# Usage

This package is intended to be used as part of a Reactjs build system such as [generator-mighty](https://github.com/dschnare/generator-mighty). For convenience Mighty Mail includes
stylesheets that take care of email client resetting and adding classes for several useful styles. Think of these
styles as a base. All styles are also included as sass and less files.

	npm install mighty-mail


# Gotchas

Because we're using React there are a few gotchas that you'll have to be aware of when implementing your emails.

- HTML or JavaScript comments are not permitted in JSX code.

This also makes conditional `<if mso>` blocks impossible to add to your markup between elements.
To get around this the Mighty Mail components render HTML as raw HTML. This means comments
can be inserted as the following.

	{"<!-- my comment -->"}

Normally HTML entities are handled intelligently by React, but due to Mighty Mail components
being rendered as raw HTML, HTML entities must be inserted as the following.

	{"&amp;"}

If you use normal HTML components such as `<span>` then normal React HTML entity rendering occurs.

	<span>&amp;</span>
	<span>&</span>

Both statements above yield:

	<span>&amp;</span>

The following entites are conveniently exported on the module.

	AMP = "&amp;";
	NBSP = "&nbsp;";
	RSQUO = "&rsquo;";
	LSQUO = "&lsquo;";
	RDQUO = "&rdquo;";
	LDQUO = "&ldquo;";
	EMDASH = "&emdash;";
	ENDASH = "&endash;";
	REG = "&reg;";
	TM = "™";
	BULL = "&bull;";
	GT = "&gt;";
	LT = "&lt;";

Example usage:

	Big {mighty.AMP} Small
	Nike{mighty.TM}



# Components

## Layout

The following are layout oriented components that will help semantically setup your scaffolding fast.


### Table

The `Table` component is an alias for creating a `<table>` with `cellspacing`, `cellpadding` and `border` set to `0`.

{Table:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right"


### Container

The `Container` component is general purpose, composable component that can be used by other components or as a `<table>` wrapper on its own.

{Container:examples}

**Props**

- cssPrefix : string ***[required]*** `(default "container")`
- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string
- align : one of "left", "center", "right"
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.container__wrapper` element.

The `cssPrefix` property will be used as the class name prefix when setting the base class name
for the `<table>` and `<td>` elements.


### Frame

The `Frame` component makes it easy to wrap content in a `<table>` with a border.

{Frame:examples}

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 1)`
- borderColor : string
- bgColor: string
- className : string
- style: object
- width: number or string `(default "100%")`
- align: one of "left", "center", "right" `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "top")`


The `wrapper` property will have all its properties applied to the inner `.frame__wrapper` element.



### Row

The `Row` component will layout `Col` components in a single horizontal row with an optionally gutter between each column.

{Row:examples}

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- borderColor : string
- bgColor: string
- className : string
- style: object
- width: number or string `(default "100%")`
- align: one of "left", "center", "right" `(default "center")`
- gutter : number
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.row__wrapper` element.

If no `gutter` is speficied or the `width` is a string then the columns will not be distrubuted (i.e. their widths will be untouched). Otherwise each column will have its width distributed appropriately to support the gutter. You can still specify a width as a string or a number with no gutter and manually specify your column widths.



### Col

The `Col` component is mainly used as a column within a row, but there are no restrictions as to where it can be used.

{Col:examples}

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string
- align : one of "left", "center", "right" `(default "left")`
- float : one of "left", "right"
- span : number `(default 1)`
- gutter : number
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.col__wrapper` element.

The `span` property is used by the `Row` component as a colspan for a given column.



### FullWidthRow

The `FullWidthRow` is a kind of row that will span the entire width of an email but have a nested row markup.
This component is useful for having a full width section with a background color while still having your content
respect the deimensions of the email body.

{FullWidthRow:examples}

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string `(default "100%")`
- align : one of "left", "center", "right" `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
- rowWrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `bgColor` and `className` properties are applied to the `.full-width-row` element.

The `width` and `gutter` properties are passed to a nested `Row` component.

The `wrapper` property will have all its properties applied to the inner `.full-width-row__wrapper` element.

The `rowWrapper` property will have all its properties applied to the inner `.row__wrapper` element.


## Content

The following are content oriented components that will help you semantically organize your content.

### RawHtml

The `RawHtml` component is a convenient way to render complex HTML or comments that would not otherwise be permitted with Reactjs.

{RawHtml:examples}

**Props**

- wrapper : string ***[required]*** `(default "div")`
- any property

The `wrapper` propery is the name of the element to wrap the conetent of the component with.

All other properties are set on the wrapper element as-is.



### Divider

The `Divider` component renders a horizontal divider.

{Divider:examples}

**Props**

- width : number or string `(default "100%")`
- thickness : number `(default 1)`
- color : string `(default "#eaeaea")`
- className : string
- wrapper : shape
	- className: string

The `wrapper` property will have all its properties applied to the inner `.divider__wrapper` element.



### Image

The `Image` component renders an image, but if no `width` or `height` is specified then the dimensions will be read from the file and be set on the rendered `<img>` element.

{Image:examples}

**Props**

- src : string
- width : number or string
- height : number or string
- border : number or string `(default 0)`
- className : string
- style : object



### Hero

The `Hero` component renders an area with a background image behind its content.

{Hero:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "center")`
- background : string
- height : number
- wrapper : shape
	- className : string
	- style : object
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "middle")`
- cell : shape
	- align `(default "center")`
	- wrapper : shape
		- className : string
		- style : object
		- align : one of "left", "center", "right" `(default "center")`
		- valign : one of "top", "middle", "bottom" `(default "middle")`

The `wrapper` property will have all its properties applied to the `.hero__bg` element.
The `cell` property will have all its properties applied to the `<table>` column wrapping the hero content.
The `cell.wrapper` property will have all its properties applied to the `.hero__wrapper` element.



### ParaBlock

The `ParaBlock` is a container for `Paragraph` components.

{ParaBlock:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "left")`


### Para

The `Para` component represents a paragraph of content that gives more control over vertical spacing.
These components can only be used within `ParaBlock` components.

{Para:examples}

**Props**

- className: string
	- wrapper: shape
	- bgColor: string
	- style: object
	- width: number or string
	- height: number or string
	- align: one of "left", "center", "right" `(default "left")`
	- valign: one of "top", "middle", "bottom" `(default "top")`



### Button

The `Button` component renders a bulletproof button from Campaign Monitor.

{Button:examples}

**Props**

- width : number `(default 200)`
- height : number `(default 40)`
- href : string `(default "http://replaceme.com/")`
- borderColor : string
- borderSize : number `(default 1)`
- borderRadius : number `(default 0)`
- textColor : string `(default "#ffffff")`
- fontFamily : string `(default "sans-serif")`
- fontSize : number `(default 13)`
- fontWeight : number `(default "bold")`
- bgColor : string `(default "#000000")`
- className : string



### List

The `List` component renders a list of items when more control over spacing is needed.

{List:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right"
- bullet : string ***[required]*** `(default "\u2022" -- the bullet character)`

The `bullet` property is passed down to each `ListItem` child so that the entire list has the same bullet value.


### ListItem

The `ListItem` component represents an item in a list that gives more control over vertical and horizontal spacing.
These components can only be used within `List` or `BulletList` components.

{ListItem:examples}

**Props**

- bullet : string ***[required]*** `(default "\u2022" -- the bullet character)`
- className : string
- itemWrapper : shape
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`
- bulletWrapper : shape
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `itemWrapper` property will have all its properties applied to the inner `.list__item-wrapper` element.

The `bulletWrapper` property will have all its properties applied to the inner `.list__bullet-wrapper` element

The `className` property will be applied to the `.list__item` and the element.


### OrderedList

The `OrderedList` component represents an ordered list of `ListeItem` components.

{OrderedList:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right"



## MediaObject

The `MediaObject` component makes it easy to create a two column layout without a conditional `<td>` as a separator.

Note that there must exactly two `Col` child elements. It's permissible to specify the width of one, two or no `Col` children.

{MediaObject:examples}

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : number ***[required]***
- align : one of "left", "center", "right" `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.media-object__wrapper` element.