# Mighty Mail

Reactjs components for static server rendering of HTML emails.

# Usage

This package is intended to be used as part of a Reactjs build system. For convenience Mighty Mail includes
stylesheets that take care of email client resetting and adding classes for several useful styles. Think of these
styles as a base. All styles are also included as sass and less files.

# Components

## Layout

The following are layout oriented components that will help semantically setup your scaffolding fast.


### Table

The `Table` component is an alias for creating a `<table>` with `cellspacing`, `cellpadding` and `border` set to `0`.

**Usage**

	<Table>
		<tr>
			<td>My column</td>
		</tr>
	</Table>

**Output**

	<table cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td>My column</td>
		</tr>
	</table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of [left", "center", "right" `(default "left")`



### Frame

The `Frame` component makes it easy to wrap content in a `<table>` with a border.

**Usage**

	<Frame width={600} borderColor="#eaeaea">
		Email body
	</Frame>

**Output**

	<table cellpadding="0" cellspacing="0" width="600" border="1" align="center" style="border-color: #eaeaea;" class="frame">
		<tbody>
			<tr>
				<td align="center" valign="top" width="600" class="frame-wrapper">Email Body</td>
			</tr>
		</tbody>
	</table>

**Props**

- border : number or string `(default 1)`
- borderColor : string
- bgColor: string
- className : string
- style: object
- width: number or string `(default "100%")`
- align: one of "left", "center", "right" `default "center")`
- wrapper : shape 
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "top")`


The `wrapper` property will have all its properties applied to the inner `.frame-wrapper` element.



### Container

The `Container` component is general purpose, composable component that can be used by other components or as a `<table>` wrapper on its own.

**Usage**

	<Container>
		Content
	</Container>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" align="left" class="container">
		<tbody>
			<tr>
				<td align="left" valign="top" class="container-wrapper">Content</td>
			</tr>
		</tbody>
	</table>


**Props**

- cssPrefix : string `(default "container")`
- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string
- align : one of "left", "center", "right" `(default "left")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- background : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.container-wrapper` element.

The `cssPrefix` property will be used as the class name prefix when setting the base class name
for the `<table>` and `<td>` elements.



### Row

The `Row` component will layout `Col` components in a single horizontal row with an optionally gutter between each column.

**Usage**

	<Row width={600} gutter={10}>
		<Col>
			Column 1
		</Col>
		<Col>
			Column 2
		</Col>
	</Row>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" align="center" class="row">
		<tbody>
			<tr>
				<td class="row-wrapper">
					<table cellpadding="0" cellspacing="0" border="0" align="left" width="290" class="col">
						<tbody>
							<tr>
								<td align="left" valign="top" class="col-wrapper">Column 1</td>
							</tr>
						</tbody>
					</table>
				<!--[if mso]></td><td><![endif]-->
					<table cellpadding="0" cellspacing="0" border="0" align="left" width="310" style="padding-left: 10px;" class="col">
						<tbody>
							<tr>
								<td align="left" valign="top" class="col-wrapper">Column 1</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>

**Props**

- width : string or number `(default "100%")`
- gutter : number
- bgColor : string
- className : string
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number
	- align : one of "left", "center", "right"
	- valign : one of "top", "middle", "bottom"

The `wrapper` property will have all its properties applied to the inner `.row-wrapper` element.

If no `gutter` is speficied or the `width` is a string then the columns will not be distrubuted (i.e. their widths will be untouched).
Otherwise each column will have its width distributed appropriately to support the gutter. You can still specify a width as a string or
a number with no gutter and manually specify your column widths.



### Col

The `Col` component is mainly used as a column within a row, but there are no restrictions as to where it can be used.

**Usage**

	<Col>
		Content
	</Col>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" class="col">
		<tbody>
			<tr>
				<td align="left" valign="top" class="col-wrapper">Content</td>
			</tr>
		</tbody>
	</table>

**Props**

- span : number `(default 1)`
- gutter : number
- bgColor : string
- className : string
- style : object
- width : number
- align : one of "left", "center", "right" `(default "left")`
- float : one of "left", "right"
- wrapper : shape
	- className : string
	- bgColor : string
	- width : number
	- height : number
	- style : object
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.col-wrapper` element.

The `span` property is used by the `Row` component as a colspan for a given column.



### FullWidthRow

The `FullWidthRow` is a kind of row that will span the entire width of an email but have a nested row markup.
This component is useful for having a full width section with a background color while still having your content
respect the deimensions of the email body.

**Usage**

	<FullWidthRow bgColor="#ff0000" width={600}>
		<Col width={600}>
			Content
		</Col>
	</FullWidthRow>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" width="100%" align="center" bgcolor="#ff0000" class="full-width-row">
		<tbody>
			<tr>
				<td align="center" valign="top" class="full-width-row-wrapper">
					<table cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="row">
						<tbody>
							<tr>
								<td class="row-wrapper">
									<table cellpadding="0" cellspacing="0" border="0" width="600" align="left" class="col">
										<tbody>
											<tr>
												<td align="left" valign="top" width="600" class="col-wrapper">
													Content
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>

**Props**

- width: number or string
- gutter: number
- bgColor: string
- className: string
- wrapper: shape
	- className: string
	- style: object
	- bgColor: string
	- align: one of "left", "center", "right" `(default "center")`
	- valign: one of "top", "middle", "bottom" `(default "top")`
- rowWrapper: shape
	- className: string
	- style: object
	- bgColor: string
	- align: one of "left", "center", "right"
	- valign: one of "top", "middle", "bottom"

The `bgColor` and `className` properties are applied to the `.full-width-row` element.

The `width` and `gutter` properties are passed to a nested `Row` component.

The `wrapper` property will have all its properties applied to the inner `.full-width-row-wrapper` element.

The `rowWrapper` property will have all its properties applied to the inner `.row-wrapper` element.


## Content

The following are content oriented components that will help you semantically organize your content.

### RawHtml

The `RawHtml` component is a convenient way to render complex HTML or comments that would not otherwise be permitted with Reactjs.

**Usage**

	<RawHtml>
		{"<!--[if mso]>Yep MSO<![endif]-->"}
	</RawHtml>

**Output**

	<div><!--[if mso]>Yep MSO<![endif]--></div>

**Props**

- wrapper : string `(default "div")`
- any property

The `wrapper` propery is the name of the element to wrap the conetent of the component with.

All other properties are set on the wrapper element as-is.



### Divider

The `Divider` component renders a horizontal divider.



### Image

The `Image` component renders an image, but if no `width` or `height` is specified then the dimensions will be read from the file and be set on the rendered `<img>` element.


### Hero

The `Hero` component renders an area with a background image behind its content.


### ParagraphBlock

The `ParagraphBlock` is a container for `Paragraph` components.



### Paragraph

The `Paragraph` component represents a paragraph of content that gives more control over vertical spacing.
These components can only be used within `ParagraphBlock` components.



### Button

The `Button` component renders a bulletproof button from Campaign Monitor.



### List

The `List` component renders a list of items when more control over spacing is needed.



### ListItem

The `ListItem` component represents an item in a list that gives more control over vertical and horizontal spacing.
These components can only be used within `List` or `BulletList` components.



### BulletList

The `BulletList` component is a shortcut for using a `List` and setting the `bullet` property on each `ListItem`.
