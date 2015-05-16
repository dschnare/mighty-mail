# Mighty Mail

Reactjs components for static server rendering of HTML emails.

# Usage

This package is intended to be used as part of a Reactjs build system. For convenience Mighty Mail includes
stylesheets that take care of email client resetting and adding classes for several useful styles. Think of these
styles as a base. All styles are also included as sass and less files.

	npm install mighty-mail

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

**Usage**

	<Divider thickness={2} color="#ff00ff" width="{500}" />

**Output**

	<table cellpadding="0" cellspacing="0" border="0" width="500" align="center" class="divider">
		<tbody>
			<tr>
				<td align="center" width="500" height="2" bgcolor="#ff00ff" class="divider-wrapper" style="font-size: 1px; line-height: 1px; ms-line-height-rule: exactly;">&nbsp;</td>
			</tr>
		</tbody>
	</table>

**Props**

- width : number or string `(default "100%")`
- thickness : number `(default 1)`
- color : string `(default "#eaeaea")`
- className : string
- wrapper : shape
	- className: string

The `wrapper` property will have all its properties applied to the inner `.divider-row-wrapper` element.



### Image

The `Image` component renders an image, but if no `width` or `height` is specified then the dimensions will be read from the file and be set on the rendered `<img>` element.

**Usage**

	Image.imageBasePath = ".";

	<Image src="images/my-image.jpg" />

**Output**

	<img src="images/my-image.jpg" width="80" height="80">

**Props**

- src : string
- width : number or string
- height : number or string
- border : number or string
- className : string
- style : object



### Hero

The `Hero` component renders an area with a background image behind its content.

**Usage**

	<Hero background="images/hero.jpg" bgColor="#ffffff" width={680} height={450}>
		Content
	</Hero>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" width="680" height="450" class="row hero">
		<tbody>
			<tr>
				<td background="images/hero.jpg" bgcolor="#ffffff" width="680" height="450" class="row-wrapper hero-wrapper">
				<!--[if gte mso 9]>
					<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px;height:450px;">
						<v:fill type="tile" src="images/hero.jpg" color="#ffffff" />
						<v:textbox inset="0,0,0,0">
				<![endif]-->
					<div>
						Content
					</div>
				<!--[if gte mso 9]>
						</v:textbox>
					</v:rect>
				<![endif]-->
				</td>
			</tr>
		</tbody>
	</table>

**Props**

- background : string
- bgColor : string
- width : number
- height : number
- className : string
- style : object
- align : string `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "middle")`

The `wrapper` property will have all its properties applied to the inner `.hero-wrapper` element.



### ParagraphBlock

The `ParagraphBlock` is a container for `Paragraph` components.

**Usage**

	<ParagraphBlock>
		<Paragraph>Hello World!</Paragraph>
		<Paragraph>Hello World!</Paragraph>
	</ParagraphBlock>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" class="paragraph-block">
		<tbody>
			<tr class="paragraph first-child">
				<td align="left" class="paragraph-wrapper">Hello World!</td>
			</tr>
			<tr class="paragraph last-child">
				<td align="left" class="paragraph-wrapper">Hello World!</td>
			</tr>
		</tbody>
	</table>

**Props**

border: number or string
bgColor: string
className: string
style: object
width: number or string
align: one of "left", "center", "right" `(default "left")`


### Paragraph

The `Paragraph` component represents a paragraph of content that gives more control over vertical spacing.
These components can only be used within `ParagraphBlock` components.

**Usage**

	<Paragraph>Hello World!</Paragraph>

**Output**

	<tr class="paragraph first-child">
		<td align="left" class="paragraph-wrapper">Hello World!</td>
	</tr>

**Props**

- className: string
	- wrapper: shape
	- bgColor: string
	- style: object
	- width: number or string
	- height: number or string
	- align: one of "left", "center", "right" `(default "left")`
	- valign: one of "top", "middle", "bottom"



### Button

The `Button` component renders a bulletproof button from Campaign Monitor.

**Usage**

	<Button width={250} height={40} bgColor="#ff00ff" href="http://google.com/">Learn more</Button>

	<Button width={250} height={40} bgColor="#ff00ff" borderColor="#ff0000" href="http://google.com/">Learn more</Button>

**Output**

	<div>
		<!--[if mso]>
			<v:%rect% xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.com/" style="height:40px;v-text-anchor:middle;width:250px;" stroke="f" fillcolor="#ff00ff">
				<w:anchorlock/>
				<center>
		<![endif]-->
		<a href="http://google.com/" style="background-color: #ff00ff; color: #ffffff; display: inline-block; font-family: sans-serif; font-size: 13px; font-weight: bold; line-height: 40px; text-align: center; text-decoration: none; width: 250px; border-radius: 0; web-kit-text-size-adjust: none;">Learn more</a>
		<!--[if mso]>
			</center>
			</v:%rect%>
		<![endif]-->
	</div>

	<div>
		<!--[if mso]>
			<v:%rect% xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.com/" style="height:40px;v-text-anchor:middle;width:250px;" strokecolor="#ff0000" fillcolor="#ff00ff">
				<w:anchorlock/>
				<center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Learn more</center>
			</v:%rect%>
		<![endif]-->
		<a href="http://google.com/" style="background-color: #ff00ff; color: #ffffff; display: inline-block; font-family: sans-serif; font-size: 13px; font-weight: bold; line-height: 40px; text-align: center; text-decoration: none; width: 250px; border-radius: 0; web-kit-text-size-adjust: none;">Learn more</a>
	</div>

**Props**

- width : number `(default 200)`
- height : number `(default 40)`
- href : string `(default "http://replaceme.com/")`
- borderColor : string
- textColor : string `(default "#ffffff")`
- fontSize : number `(default 13)`
- bgColor : string `(default "#000000")`
- className : string
- borderRadius : number `(default 0)`



### List

The `List` component renders a list of items when more control over spacing is needed.

**Usage**

	<List>
		<ListItem>First</ListItem>
		<ListItem>Second</ListItem>
	</List>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" class="list">
		<tbody>
			<tr class="list-item first-child">
				<td class="list-item-wrapper">First</td>
			</tr>
			<tr class="list-item last-child">
				<td class="list-item-wrapper">Second</td>
			</tr>
		</tbody>
	</table>

**Props**

- cellSpacing : number or string
- cellPadding : number or string
- border : number or string
- bgColor : string
- className : string
- style : object
- width : number or string
- align : one of "left", "center", "right"


### ListItem

The `ListItem` component represents an item in a list that gives more control over vertical and horizontal spacing.
These components can only be used within `List` or `BulletList` components.

**Usage**

	<ListItem>First</ListItem>
	<ListItem bullet="\u2022">Second</ListItem>

**Output**

	<tr class="list-item first-child">
		<td class="list-item-wrapper">First</td>
	</tr>
	<tr class="list-item list-item-with-bullet last-child">
		<td class="list-bullet-wrapper">•</td>
		<td class="list-item-wrapper">Second</td>
	</tr>

**Props**

- bullet : string
- className : string
- itemWrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`
- bulletWrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `itemWrapper` property will have all its properties applied to the inner `.list-item-wrapper` element.

The `bulletWrapper` property will have all its properties applied to the inner `.list-bullet-wrapper` element



### BulletList

The `BulletList` component is a shortcut for using a `List` and setting the `bullet` property on each `ListItem`.

**Usage**

	<BulletList>
		<ListItem>First</ListItem>
		<ListItem>Second</ListItem>
	</BulletList>

**Output**

	<table cellpadding="0" cellspacing="0" border="0" class="list">
		<tbody>
			<tr class="list-item list-item-with-bullet first-child">
				<td class="list-bullet-wrapper">•</td>
				<td class="list-item-wrapper">First</td>
			</tr>
			<tr class="list-item list-item-with-bullet last-child">
				<td class="list-bullet-wrapper">•</td>
				<td class="list-item-wrapper">Second</td>
			</tr>
		</tbody>
	</table>

**Props**

- bullet : string `(default "\u2022")`
- cellSpacing : number or string
- cellPadding : number or string
- border : number or string
- bgColor : string
- className : string
- style : object
- width : number or string
- align : one of "left", "center", "right"