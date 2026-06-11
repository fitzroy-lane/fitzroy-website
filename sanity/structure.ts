import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Fitzroy Catering')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      S.listItem()
        .title('Corporate Packages')
        .icon(() => '🏢')
        .child(S.documentTypeList('corporatePackage').title('Corporate Packages')),
      S.listItem()
        .title('Event Packages')
        .icon(() => '🎉')
        .child(S.documentTypeList('partyPackage').title('Event Packages')),
      S.divider(),
      S.listItem()
        .title('Menu Items')
        .icon(() => '🍽️')
        .child(S.documentTypeList('menuItem').title('Menu Items')),
      S.listItem()
        .title('Menu Category Images')
        .icon(() => '🖼️')
        .child(S.documentTypeList('menuCategory').title('Menu Category Images')),
      S.divider(),
      S.listItem()
        .title('Gallery')
        .icon(() => '📷')
        .child(S.documentTypeList('gallery').title('Gallery Images')),
    ])
