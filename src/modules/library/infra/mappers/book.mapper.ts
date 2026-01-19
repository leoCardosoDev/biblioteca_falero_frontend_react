import { Book } from '@/modules/library/domain'
import type { BookApiModel } from '@/modules/library/infra/models'
import { mapApiStatusToBookStatus } from '@/modules/library/infra/models'

export class BookMapper {
  static toDomain(apiModel: BookApiModel): Book {
    return new Book({
      id: apiModel.id,
      title: apiModel.title,
      author: apiModel.author,
      coverUrl: apiModel.coverUrl,
      isbn: apiModel.isbn,
      category: apiModel.category,
      status: mapApiStatusToBookStatus(apiModel.status),
      location: apiModel.location,
      pages: apiModel.pages,
      year: apiModel.year,
      publisher: apiModel.publisher
    })
  }

  static toDomainList(apiModels: BookApiModel[]): Book[] {
    return apiModels.map(BookMapper.toDomain)
  }
}
