// Narrative chapters drawn from public/docs/drphamsyliem.md, supplied by the user.
// Photo contexts additionally confirmed by the user: VTV1 (2017), editorial meeting (2018).
const chapter = (id, title, period, heading, paragraphs, photoEvents = []) => ({ id, title, period, heading, paragraphs, photoEvents })

const founderBiography = {
  vi: {
    heading: 'Cuộc đời, sự nghiệp và di sản',
    introduction: 'Từ giảng đường đến quản lý nhà nước, từ nghiên cứu chính sách đến xây dựng các tổ chức nghề nghiệp: khám phá cuộc đời và những đóng góp của người sáng lập ICUE qua tám chương.',
    readerHint: 'Mở từng chương hoặc đọc lần lượt bằng nút Tiếp tục.',
    back: 'Quay lại', next: 'Tiếp tục', complete: 'Đọc xong', completed: 'Đã đọc xong', counter: 'Chương {current} / {total}',
    source: 'Tư liệu tiểu sử đầy đủ',
    photoEvents: { '2017': 'Phỏng vấn truyền hình trên VTV1', '2018': 'Cuộc họp cùng các đồng nghiệp biên tập' },
    chapters: [
      chapter('life', 'Cuộc đời và quê hương', '1931–2018', 'Một cuộc đời gắn với sự phát triển đô thị Việt Nam', [
        'TS. Phạm Sỹ Liêm sinh năm 1931 tại Diễn Thành, Diễn Châu, Nghệ An. Là kỹ sư xây dựng, nhà khoa học và nhà quản lý, ông trải qua nhiều lĩnh vực công tác: giảng dạy đại học, quản lý nhà nước, nghiên cứu khoa học và thành lập các tổ chức chuyên môn.',
        'Sự nghiệp của ông gắn với những vấn đề nền tảng của đô thị: nhà ở, đất đai, hạ tầng công cộng, quy hoạch và quản trị. Qua từng giai đoạn, ông tiếp tục tìm kiếm những cải cách giúp tri thức chuyên môn đóng góp thiết thực cho sự phát triển.',
        'Ông qua đời ngày 30 tháng 11 năm 2018, hưởng thọ 87 tuổi, hay 88 tuổi theo cách tính tuổi truyền thống. Di sản để lại kết nối giáo dục kỹ thuật, kinh nghiệm công vụ, nghiên cứu chính sách độc lập và những tổ chức tiếp tục hoạt động sau ông, trong đó có ICUE.',
      ]),
      chapter('education', 'Giảng dạy và đào tạo kỹ sư', '1958–1963', 'Góp phần đặt nền móng cho đào tạo bê tông cốt thép', [
        'Trong những năm 1950–1960, ông giảng dạy kỹ thuật xây dựng và góp phần hình thành việc đào tạo chuyên ngành bê tông cốt thép tại Đại học Bách khoa Hà Nội. Tư liệu lịch sử của ngành xây dựng trong nhà trường ghi nhận đóng góp của ông trong việc đưa môn học này vào giảng dạy từ năm học 1958–1959.',
        'Tháng 10 năm 1959, ông được bổ nhiệm làm Trưởng Bộ môn Bê tông cốt thép đầu tiên. Đây là một dấu mốc quan trọng trong sự nghiệp đào tạo và xây dựng nền tảng học thuật của ông.',
        'Năm 1963, ông bắt đầu học sau đại học tại Liên Xô, sau đó tiếp tục đảm nhiệm vai trò lãnh đạo học thuật. Kinh nghiệm giảng dạy và nghiên cứu kỹ thuật trở thành một phần nền tảng cho những công việc quản lý và nghiên cứu đô thị về sau.',
      ]),
      chapter('public-service', 'Công vụ và tổ chức nghề nghiệp', 'Từ năm 1982', 'Từ quản lý nhà nước đến xây dựng cộng đồng chuyên môn', [
        'Trong sự nghiệp quản lý nhà nước, TS. Phạm Sỹ Liêm từng giữ chức Thứ trưởng Bộ Xây dựng và Phó Chủ tịch Ủy ban nhân dân thành phố Hà Nội. Những vị trí này gắn kết chuyên môn kỹ thuật của ông với các vấn đề quản lý xây dựng, hạ tầng và phát triển đô thị.',
        'Từ năm 1982, ông là Chủ tịch sáng lập Tổng hội Xây dựng Việt Nam, lãnh đạo ba nhiệm kỳ đầu tiên và về sau tiếp tục giữ vai trò Phó Chủ tịch Tổng hội.',
        'Đóng góp của ông không chỉ nằm ở chức danh lãnh đạo. Qua nhiều thập kỷ, ông tham gia xây dựng cơ cấu tổ chức, phát triển hoạt động nghiên cứu và tăng cường tiếng nói chuyên môn của Tổng hội. Việc xây dựng các thiết chế nghề nghiệp là một phần quan trọng trong những thành tựu mà đồng nghiệp ghi nhận ở ông.',
      ]),
      chapter('institutes', 'Xây dựng các viện nghiên cứu', '1999 · 2013', 'Hai tổ chức dành cho nghiên cứu đô thị và tư vấn chính sách', [
        'Trong những năm 1990–2000, ông mở rộng nghiên cứu về quản trị đô thị, hạ tầng và chính sách xây dựng. Năm 1999, ông sáng lập Viện Nghiên cứu Đô thị và Phát triển Hạ tầng, tạo một cơ sở chuyên môn dành cho những lĩnh vực này.',
        'Năm 2013, ông tiếp tục sáng lập Viện Nghiên cứu Kinh tế Xây dựng và Đô thị — ICUE — và trở thành Viện trưởng đầu tiên. Đây là một bước tiếp nối trong hành trình xây dựng các tổ chức kết nối nghiên cứu với tư vấn chính sách và thực tiễn phát triển.',
        'Hai viện nghiên cứu thể hiện sự quan tâm lâu dài của ông đối với quy hoạch đô thị, kinh tế xây dựng và hạ tầng. Với ICUE, di sản của người sáng lập nằm ở sự kết hợp giữa nền tảng kỹ thuật, kinh nghiệm quản lý công và tinh thần nghiên cứu độc lập.',
      ]),
      chapter('policy', 'Góp ý chính sách và đối thoại đô thị', '2012–2017', 'Những đóng góp cụ thể về đất đai, quy hoạch và thể chế', [
        'Thông qua sách, đề tài nghiên cứu, hội thảo và phỏng vấn, ông thường xuyên trao đổi về nhà ở, quản lý đất đai, hạ tầng công cộng và quản trị đô thị. Ông cũng nêu những bất cập trong quy hoạch và thực thi chính sách, coi việc phản biện là một phần của đóng góp chuyên môn.',
        'Năm 2012, ông gửi những ý kiến phản biện chi tiết đối với dự thảo Luật Đất đai qua VCCI. Nội dung tập trung vào thu hồi đất, quyền tài sản và tính minh bạch, cho thấy mối quan tâm của ông đến cách các quy định tác động đến đời sống và sự phát triển.',
        'Trong các năm 2016–2017, ông tham gia thảo luận công khai về Luật Quy hoạch, đề xuất tăng cường sự phối hợp trong quy hoạch quốc gia và thúc đẩy cải cách thể chế. Những đóng góp này được ghi nhận qua các hồ sơ góp ý chính sách, bên cạnh các bài tưởng nhớ về ông.',
        'Năm 2017, ông xuất hiện trong một cuộc phỏng vấn truyền hình trên VTV1. Bức ảnh tư liệu dưới đây ghi lại cuộc phỏng vấn này.',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thị và công việc biên tập', '2006–2018', 'Một diễn đàn về đô thị và chất lượng sống', [
        'Năm 2006, TS. Phạm Sỹ Liêm đồng sáng lập Người Đô Thị, một tạp chí dành cho các vấn đề đô thị, đồng thời đảm nhiệm vai trò Chủ tịch Hội đồng cố vấn chuyên môn của tạp chí.',
        'Ấn phẩm trở thành một diễn đàn trao đổi về chính sách đô thị và chất lượng sống. Công việc ở Người Đô Thị mở thêm một hướng đóng góp của ông: đưa những vấn đề chuyên môn ra thảo luận cùng công chúng, bên cạnh nghiên cứu và hoạt động trong các tổ chức nghề nghiệp.',
        'Ông tiếp tục gắn bó về chuyên môn với tạp chí cho đến khi qua đời. Bức ảnh năm 2018 ghi lại ông trong cuộc họp cùng các đồng nghiệp biên tập, một trong những cuộc họp biên tập cuối cùng của ông được ghi lại.',
      ], ['2018']),
      chapter('scholarship', 'Nghiên cứu đến những năm cuối đời', 'Tháng 9.2018', 'Tân kinh tế học thể chế — công trình ở tuổi 87', [
        'Trong các năm 2017–2018, dù tuổi đã cao, ông vẫn tiếp tục nghiên cứu và tư vấn cho các tổ chức chuyên môn. Niềm say mê học thuật không dừng lại khi ông đã trải qua nhiều cương vị quản lý cấp cao.',
        'Tháng 9 năm 2018, ông xuất bản Tân kinh tế học thể chế, công trình học thuật lớn cuối cùng của mình. Cuốn sách tìm hiểu mối quan hệ giữa thể chế và phát triển kinh tế, tiếp nối sự quan tâm lâu dài của ông đối với cải cách và quản trị.',
        'Được xuất bản khi tác giả 87 tuổi, cuốn sách được ghi nhận đã tham khảo hơn 200 tài liệu nước ngoài, cùng các nghiên cứu và văn bản chính sách của Việt Nam. Công trình này cho thấy tinh thần tiếp tục học hỏi và lao động trí tuệ của ông trong năm cuối đời.',
      ]),
      chapter('legacy', 'Con người và ký ức đồng nghiệp', 'Ký ức tại lễ tưởng nhớ năm 2019', 'Liêm chính, chiều sâu tri thức và sức làm việc', [
        'Đồng nghiệp nhớ đến ông như một học giả tiếp tục học hỏi ngay cả sau khi đã giữ những chức vụ quản lý cấp cao. Các bài viết về ông ghi nhận khả năng sử dụng bốn ngoại ngữ: tiếng Anh, tiếng Pháp, tiếng Nga và tiếng Trung.',
        'Tại một sự kiện tưởng nhớ năm 2019, Chủ tịch Tổng hội Trần Ngọc Hùng kể lại rằng mỗi khi đi nước ngoài, TS. Phạm Sỹ Liêm thường tìm đến các hiệu sách. Ông có một thư viện cá nhân phong phú, đọc rộng nhiều lĩnh vực và còn yêu thích cả tiểu thuyết võ hiệp.',
        'Viện sĩ Phạm Hồng Giang nhìn nhận di sản của ông qua ba phẩm chất: sự liêm chính, chiều sâu tri thức và năng lực làm việc đặc biệt. Đây là những đánh giá, ký ức của đồng nghiệp, giúp phác họa con người phía sau các chức danh và công trình.',
        'Bài viết Nghĩ về một người cống hiến năm 2019 mang đến một góc nhìn gần gũi hơn qua lời kể của người đã làm việc với ông trong nhiều thập kỷ. Đối với ICUE, sự kết hợp giữa đào tạo kỹ sư, công vụ, nghiên cứu độc lập, xây dựng tổ chức và học tập suốt đời là di sản bền lâu của người sáng lập.',
      ]),
    ],
  },
  en: {
    heading: 'Life, work and legacy',
    introduction: 'From university teaching to public administration, policy research and institution building: explore the life and contributions of ICUE’s founder in eight chapters.',
    readerHint: 'Open any chapter, or read in order with Continue.',
    back: 'Back', next: 'Continue', complete: 'Finish reading', completed: 'Reading complete', counter: 'Chapter {current} of {total}',
    source: 'Full biographical notes',
    photoEvents: { '2017': 'VTV1 television interview', '2018': 'Meeting with his editorial colleagues' },
    chapters: [
      chapter('life', 'Life and origins', '1931–2018', 'A life connected to Vietnam’s urban development', [
        'Dr. Phạm Sỹ Liêm was born in 1931 in Diễn Thành, Diễn Châu, Nghệ An. A civil engineer, scholar and public administrator, he worked across university teaching, senior government service, scientific research and the creation of professional institutions.',
        'His work repeatedly returned to the foundations of urban life: housing, land, public infrastructure, planning and governance. Across these different roles, he examined how professional knowledge and institutional reform could contribute to development.',
        'He died on 30 November 2018, aged 87, or 88 by traditional Vietnamese age reckoning. His legacy connects engineering education, public service, independent policy research and organizations that continued beyond his lifetime, including ICUE.',
      ]),
      chapter('education', 'Engineering education', '1958–1963', 'Helping establish reinforced-concrete engineering education', [
        'During the 1950s and 1960s, he taught civil engineering and helped establish reinforced-concrete engineering education at Hanoi University of Science and Technology. The university’s construction faculty records identify his role in introducing the subject in the 1958–1959 academic year.',
        'In October 1959, he was appointed the first head of the Reinforced Concrete Department. This was an early milestone in a career that involved developing both teaching and academic institutions.',
        'He began postgraduate study in the Soviet Union in 1963 and subsequently continued his academic leadership. His experience in engineering education and research formed part of the foundation for his later public administration and urban policy work.',
      ]),
      chapter('public-service', 'Public service and professional institutions', 'From 1982', 'Government leadership and a stronger professional community', [
        'His government career included service as Deputy Minister of Construction and Vice Chairman of the Hanoi People’s Committee. These roles brought his engineering background into contact with the practical administration of construction, infrastructure and urban development.',
        'From 1982, he served as founding president of the Vietnam Federation of Civil Engineering Associations, leading its first three terms and later continuing as vice president.',
        'His contribution extended beyond holding office. Over decades, he helped develop the federation’s organizational structure, research activities and professional influence. Building durable professional institutions was one of the important achievements remembered by his colleagues.',
      ]),
      chapter('institutes', 'Building research institutes', '1999 · 2013', 'Two institutions for urban research and policy advice', [
        'During the 1990s and 2000s, he expanded his research into urban governance, infrastructure and construction policy. In 1999, he founded the Institute for Urban Research and Infrastructure Development, providing an institutional base for work in these fields.',
        'In 2013, he founded ICUE and became its inaugural director. This continued his work of creating organizations that connected research with policy advice and the practical challenges of development.',
        'The two institutes reflect his sustained attention to urban planning, construction economics and infrastructure. For ICUE, his founding legacy lies in the combination of engineering knowledge, public administration experience and independent inquiry.',
      ]),
      chapter('policy', 'Urban policy and public debate', '2012–2017', 'Specific contributions on land, planning and institutions', [
        'Through books, research projects, conferences and interviews, he examined housing, land management, public infrastructure and urban governance. His work included public criticism of weaknesses in planning and policy implementation, making professional debate part of his contribution.',
        'In 2012, he submitted detailed criticism of the draft Land Law through VCCI. His comments addressed land acquisition, property rights and transparency, showing his concern with how institutional rules affected both development and everyday life.',
        'In 2016–2017, he took part in public discussions of the Planning Law, arguing for more coordinated national planning and stronger institutional reform. These contributions are recorded in policy submissions as well as recalled in professional memorials.',
        'In 2017, he appeared in a VTV1 television interview. The archive photograph below records that interview.',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thị and editorial work', '2006–2018', 'A forum for urban affairs and quality of life', [
        'In 2006, he co-founded Người Đô Thị, a magazine dedicated to urban affairs, and chaired its professional advisory board.',
        'The publication became a platform for discussion of urban policy and quality of life. His work with the magazine added a public forum to his research and professional activities, bringing specialist questions into a wider conversation about cities.',
        'He remained professionally involved with the magazine until his death. The 2018 photograph shows him meeting with his editorial colleagues at one of his final documented editorial meetings.',
      ], ['2018']),
      chapter('scholarship', 'Scholarship into his final year', 'September 2018', 'New Institutional Economics, published at the age of 87', [
        'In 2017–2018, despite his advanced age, he continued researching and advising professional organizations. His academic curiosity remained active long after he had held senior government positions.',
        'In September 2018, he published Tân kinh tế học thể chế (New Institutional Economics), his final major academic work. The book explored the relationship between institutions and economic development, continuing his longstanding interest in governance and reform.',
        'Published when he was 87, it reportedly drew on more than 200 foreign references alongside Vietnamese research and policy documents. It stands as a record of sustained learning and intellectual work in the final year of his life.',
      ]),
      chapter('legacy', 'The person remembered by colleagues', 'Recollections at a 2019 memorial', 'Integrity, intellectual depth and a remarkable capacity for work', [
        'Colleagues remembered a scholar who continued learning after reaching senior public office. Accounts of his life report that he spoke four foreign languages: English, French, Russian and Chinese.',
        'At a 2019 memorial event, federation chairman Trần Ngọc Hùng recalled that, when travelling abroad, Dr. Liêm would seek out bookshops. He maintained an extensive personal library, read widely and even enjoyed martial-arts fiction.',
        'Academician Phạm Hồng Giang described his legacy through three qualities: personal integrity, intellectual depth and an exceptional capacity for work. These are colleagues’ assessments and recollections, offering a view of the person behind the official posts and published work.',
        'The 2019 article Nghĩ về một người cống hiến provides a more personal account through recollections by someone who worked with him for decades. For ICUE, his enduring legacy brings together engineering education, government service, independent inquiry, institution building and lifelong scholarship.',
      ]),
    ],
  },
  de: {
    heading: 'Leben, Wirken und Vermächtnis',
    introduction: 'Von der Hochschullehre über die öffentliche Verwaltung bis zur Politikforschung und zum Aufbau von Institutionen: acht Kapitel über das Leben und die Beiträge des ICUE-Gründers.',
    readerHint: 'Öffnen Sie ein Kapitel oder lesen Sie mit Weiter der Reihe nach.',
    back: 'Zurück', next: 'Weiter', complete: 'Lektüre beenden', completed: 'Lektüre beendet', counter: 'Kapitel {current} von {total}',
    source: 'Vollständige biografische Notizen',
    photoEvents: { '2017': 'Fernsehinterview auf VTV1', '2018': 'Sitzung mit seinen Redaktionskollegen' },
    chapters: [
      chapter('life', 'Leben und Herkunft', '1931–2018', 'Ein Leben im Zeichen der Stadtentwicklung Vietnams', [
        'Dr. Phạm Sỹ Liêm wurde 1931 in Diễn Thành, Diễn Châu, Nghệ An geboren. Als Bauingenieur, Wissenschaftler und Verwaltungsfachmann wirkte er in der Hochschullehre, in leitenden Regierungsämtern, in der Forschung und beim Aufbau von Berufsorganisationen.',
        'Wohnen, Boden, öffentliche Infrastruktur, Planung und Stadtverwaltung bildeten wiederkehrende Themen seiner Arbeit. In seinen verschiedenen Funktionen beschäftigte er sich damit, wie Fachwissen und institutionelle Reformen zur Entwicklung beitragen können.',
        'Er starb am 30. November 2018 im Alter von 87 Jahren, beziehungsweise 88 nach traditioneller vietnamesischer Alterszählung. Sein Vermächtnis verbindet Ingenieurausbildung, öffentlichen Dienst, unabhängige Politikforschung und Institutionen, die über sein Leben hinaus fortbestehen, darunter ICUE.',
      ]),
      chapter('education', 'Lehre und Ingenieurausbildung', '1958–1963', 'Grundlagen der Ausbildung im Stahlbetonbau', [
        'In den 1950er- und 1960er-Jahren lehrte er Bauingenieurwesen und half beim Aufbau der Stahlbetonausbildung an der Technischen Universität Hanoi. Die historischen Unterlagen der Baufakultät dokumentieren seine Mitwirkung bei der Einführung des Fachs im Studienjahr 1958–1959.',
        'Im Oktober 1959 wurde er zum ersten Leiter der Abteilung für Stahlbeton ernannt. Dies war ein früher Meilenstein seiner Arbeit in Lehre und akademischem Organisationsaufbau.',
        '1963 begann er ein postgraduales Studium in der Sowjetunion und setzte später seine akademische Führungsarbeit fort. Erfahrungen aus Lehre und technischer Forschung bildeten eine Grundlage für seine spätere Tätigkeit in Verwaltung und Stadtpolitik.',
      ]),
      chapter('public-service', 'Öffentlicher Dienst und Berufsverbände', 'Ab 1982', 'Regierungsverantwortung und Aufbau einer Fachgemeinschaft', [
        'In seiner Verwaltungslaufbahn war er stellvertretender Bauminister und stellvertretender Vorsitzender des Volkskomitees von Hanoi. In diesen Ämtern verband er seine ingenieurwissenschaftliche Ausbildung mit der praktischen Verwaltung von Bauwesen, Infrastruktur und Stadtentwicklung.',
        'Ab 1982 war er Gründungspräsident des vietnamesischen Verbands der Bauingenieurvereinigungen. Er leitete dessen erste drei Amtsperioden und wirkte später als Vizepräsident weiter.',
        'Über Jahrzehnte half er, die Organisationsstruktur, Forschungsaktivitäten und fachliche Wirkung des Verbands auszubauen. Der Aufbau beständiger Berufsorganisationen gehörte zu den Leistungen, an die seine Kollegen erinnerten.',
      ]),
      chapter('institutes', 'Aufbau von Forschungsinstituten', '1999 · 2013', 'Zwei Einrichtungen für Stadtforschung und Politikberatung', [
        'In den 1990er- und 2000er-Jahren erweiterte er seine Forschung auf Stadtverwaltung, Infrastruktur und Baupolitik. 1999 gründete er das Institut für Stadtforschung und Infrastrukturentwicklung und schuf damit eine institutionelle Grundlage für diese Themen.',
        '2013 gründete er ICUE und wurde dessen erster Direktor. Damit setzte er sein Engagement für Einrichtungen fort, die Forschung mit Politikberatung und praktischen Entwicklungsfragen verbinden.',
        'Beide Institute spiegeln sein dauerhaftes Interesse an Stadtplanung, Bauökonomie und Infrastruktur wider. Für ICUE liegt sein Gründungsvermächtnis in der Verbindung von technischem Wissen, Verwaltungserfahrung und unabhängiger Forschung.',
      ]),
      chapter('policy', 'Stadtpolitik und öffentliche Debatten', '2012–2017', 'Beiträge zu Bodenrecht, Planung und Institutionen', [
        'In Büchern, Forschungsprojekten, Konferenzen und Interviews untersuchte er Wohnungsfragen, Bodenmanagement, öffentliche Infrastruktur und Stadtverwaltung. Er kritisierte auch Schwächen der Planung und der Umsetzung politischer Vorgaben.',
        '2012 reichte er über VCCI eine ausführliche Stellungnahme zum Entwurf des Bodengesetzes ein. Sie behandelte Landerwerb, Eigentumsrechte und Transparenz und verdeutlichte sein Interesse an den Folgen institutioneller Regeln für Entwicklung und Alltag.',
        '2016–2017 beteiligte er sich an öffentlichen Diskussionen zum Planungsgesetz. Er befürwortete eine besser abgestimmte nationale Planung und stärkere institutionelle Reformen. Diese Beiträge sind in politischen Stellungnahmen dokumentiert und werden auch in Gedenktexten gewürdigt.',
        '2017 gab er ein Fernsehinterview auf VTV1. Das folgende Archivfoto hält dieses Interview fest.',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thị und die Redaktionsarbeit', '2006–2018', 'Ein Forum für Stadtfragen und Lebensqualität', [
        '2006 war er Mitgründer von Người Đô Thị, einer Zeitschrift für Stadtfragen, und übernahm den Vorsitz ihres fachlichen Beirats.',
        'Die Publikation wurde zu einer Plattform für Diskussionen über Stadtpolitik und Lebensqualität. Neben Forschung und Verbandsarbeit eröffnete sie ihm einen öffentlichen Raum, in dem Fachfragen in einen breiteren Austausch über Städte einflossen.',
        'Bis zu seinem Tod blieb er der Zeitschrift fachlich verbunden. Das Foto von 2018 zeigt ihn mit seinen Redaktionskollegen bei einer seiner letzten dokumentierten Redaktionssitzungen.',
      ], ['2018']),
      chapter('scholarship', 'Forschung bis ins letzte Lebensjahr', 'September 2018', 'Neue Institutionenökonomik: veröffentlicht mit 87 Jahren', [
        'Auch 2017–2018 forschte er trotz seines hohen Alters weiter und beriet Fachorganisationen. Seine wissenschaftliche Neugier blieb lange nach seiner Tätigkeit in hohen Regierungsämtern lebendig.',
        'Im September 2018 veröffentlichte er Tân kinh tế học thể chế (Neue Institutionenökonomik), sein letztes großes wissenschaftliches Werk. Es untersucht die Beziehung zwischen Institutionen und wirtschaftlicher Entwicklung und führt sein Interesse an Verwaltung und Reformen fort.',
        'Das im Alter von 87 Jahren veröffentlichte Buch soll mehr als 200 ausländische Quellen sowie vietnamesische Forschung und politische Dokumente einbezogen haben. Es belegt sein fortgesetztes Lernen und seine intellektuelle Arbeit bis ins letzte Lebensjahr.',
      ]),
      chapter('legacy', 'Erinnerungen seiner Kollegen', 'Gedenkveranstaltung 2019', 'Integrität, geistige Tiefe und außergewöhnliche Arbeitskraft', [
        'Kollegen erinnerten an einen Gelehrten, der auch nach dem Aufstieg in hohe Staatsämter weiterlernte. Berichte über sein Leben nennen vier Fremdsprachen, die er beherrscht haben soll: Englisch, Französisch, Russisch und Chinesisch.',
        'Bei einer Gedenkveranstaltung 2019 erzählte Verbandspräsident Trần Ngọc Hùng, dass Dr. Liêm auf Auslandsreisen Buchhandlungen aufsuchte. Er besaß eine umfangreiche Privatbibliothek, las vielfältig und schätzte auch Kampfkunst-Romane.',
        'Akademiemitglied Phạm Hồng Giang beschrieb sein Vermächtnis anhand dreier Eigenschaften: persönliche Integrität, geistige Tiefe und eine außergewöhnliche Arbeitsfähigkeit. Diese Einschätzungen und Erinnerungen seiner Kollegen zeigen den Menschen hinter Ämtern und Veröffentlichungen.',
        'Der Artikel Nghĩ về một người cống hiến von 2019 bietet einen persönlichen Blick aus der Erinnerung eines jahrzehntelangen Weggefährten. Für ICUE verbindet sein bleibendes Vermächtnis Ingenieurausbildung, Staatsdienst, unabhängige Forschung, Institutionenaufbau und lebenslanges Lernen.',
      ]),
    ],
  },
  fr: {
    heading: 'Vie, œuvre et héritage',
    introduction: 'De l’enseignement universitaire à l’administration publique, de la recherche sur les politiques urbaines à la création d’institutions : huit chapitres pour découvrir le parcours du fondateur de l’ICUE.',
    readerHint: 'Ouvrez un chapitre ou lisez dans l’ordre avec Continuer.',
    back: 'Retour', next: 'Continuer', complete: 'Terminer la lecture', completed: 'Lecture terminée', counter: 'Chapitre {current} sur {total}',
    source: 'Notes biographiques complètes',
    photoEvents: { '2017': 'Entretien télévisé sur VTV1', '2018': 'Réunion avec ses collègues de la rédaction' },
    chapters: [
      chapter('life', 'Vie et origines', '1931–2018', 'Une vie liée au développement urbain du Vietnam', [
        'Le Dr Phạm Sỹ Liêm est né en 1931 à Diễn Thành, Diễn Châu, Nghệ An. Ingénieur civil, chercheur et administrateur public, il a exercé dans l’enseignement supérieur, les hautes fonctions gouvernementales, la recherche scientifique et la création d’organisations professionnelles.',
        'Le logement, le foncier, les infrastructures publiques, la planification et la gouvernance urbaine traversent son œuvre. Dans ses différentes fonctions, il a examiné comment les connaissances spécialisées et les réformes institutionnelles pouvaient contribuer au développement.',
        'Il est décédé le 30 novembre 2018, à 87 ans, ou 88 selon le décompte traditionnel vietnamien. Son héritage relie formation des ingénieurs, service public, recherche indépendante et institutions qui lui ont survécu, dont l’ICUE.',
      ]),
      chapter('education', 'Enseignement et formation des ingénieurs', '1958–1963', 'Contribuer à l’enseignement du béton armé', [
        'Dans les années 1950–1960, il a enseigné le génie civil et contribué à établir l’enseignement du béton armé à l’Université des sciences et technologies de Hanoï. Les archives de la faculté de construction attestent sa participation à l’introduction de cette matière pendant l’année universitaire 1958–1959.',
        'En octobre 1959, il a été nommé premier responsable du département de béton armé. Cette étape marque son rôle précoce dans la formation et le développement des structures universitaires.',
        'Il a entrepris des études de troisième cycle en Union soviétique en 1963, avant de poursuivre ses responsabilités universitaires. Cette expérience pédagogique et scientifique a constitué une base de ses futurs travaux dans l’administration et les politiques urbaines.',
      ]),
      chapter('public-service', 'Service public et organisations professionnelles', 'À partir de 1982', 'Des responsabilités publiques à une communauté professionnelle durable', [
        'Il a exercé les fonctions de vice-ministre de la Construction et de vice-président du Comité populaire de Hanoï. Ces responsabilités ont relié sa formation d’ingénieur à la gestion concrète de la construction, des infrastructures et du développement urbain.',
        'À partir de 1982, il a été président fondateur de la Fédération vietnamienne des associations de génie civil. Il en a dirigé les trois premiers mandats, puis a continué à y exercer comme vice-président.',
        'Pendant plusieurs décennies, il a contribué à sa structure organisationnelle, à ses activités de recherche et à son influence professionnelle. Ses collègues ont reconnu dans la construction de ces institutions durables une part importante de son action.',
      ]),
      chapter('institutes', 'La création d’instituts de recherche', '1999 · 2013', 'Deux institutions pour la recherche urbaine et le conseil', [
        'Dans les années 1990–2000, ses recherches se sont élargies à la gouvernance urbaine, aux infrastructures et aux politiques de construction. En 1999, il a fondé l’Institut de recherche urbaine et de développement des infrastructures, donnant une assise institutionnelle à ces travaux.',
        'En 2013, il a fondé l’ICUE et en est devenu le premier directeur. Cette création prolonge son engagement en faveur d’organisations reliant recherche, conseil en politiques publiques et réalités du développement.',
        'Les deux instituts reflètent son intérêt constant pour la planification urbaine, l’économie de la construction et les infrastructures. Pour l’ICUE, son héritage fondateur associe connaissances techniques, expérience de l’administration publique et indépendance de la recherche.',
      ]),
      chapter('policy', 'Politiques urbaines et débat public', '2012–2017', 'Des contributions sur le foncier, la planification et les institutions', [
        'À travers ses ouvrages, projets de recherche, conférences et entretiens, il a étudié le logement, la gestion foncière, les infrastructures publiques et la gouvernance urbaine. Il a également critiqué publiquement les faiblesses de la planification et de la mise en œuvre des politiques.',
        'En 2012, il a transmis par l’intermédiaire de VCCI une critique détaillée du projet de loi foncière. Ses observations portaient sur l’acquisition des terres, les droits de propriété et la transparence, témoignant de son attention aux effets des règles institutionnelles.',
        'En 2016–2017, il a participé aux discussions publiques sur la loi de planification, défendant une meilleure coordination nationale et des réformes institutionnelles plus fortes. Ces contributions sont consignées dans des observations sur les politiques, au-delà des hommages professionnels.',
        'En 2017, il a accordé un entretien télévisé sur VTV1. La photographie d’archives ci-dessous provient de cet entretien.',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thị et le travail éditorial', '2006–2018', 'Un espace de débat sur la ville et la qualité de vie', [
        'En 2006, il a cofondé Người Đô Thị, une revue consacrée aux questions urbaines, et présidé son conseil consultatif professionnel.',
        'La publication est devenue une plateforme de discussion sur les politiques urbaines et la qualité de vie. Elle a ajouté à ses activités scientifiques et professionnelles un espace public où les questions spécialisées pouvaient nourrir une réflexion plus large sur les villes.',
        'Il est resté professionnellement engagé auprès de la revue jusqu’à son décès. La photographie de 2018 le montre avec ses collègues de la rédaction, lors de l’une de ses dernières réunions de rédaction documentées.',
      ], ['2018']),
      chapter('scholarship', 'La recherche jusqu’à sa dernière année', 'Septembre 2018', 'La Nouvelle économie institutionnelle, publiée à 87 ans', [
        'En 2017–2018, malgré son âge avancé, il poursuivait ses recherches et ses conseils auprès d’organisations professionnelles. Sa curiosité scientifique est restée vive bien après ses hautes responsabilités gouvernementales.',
        'En septembre 2018, il a publié Tân kinh tế học thể chế (Nouvelle économie institutionnelle), son dernier grand ouvrage universitaire. Il y explore les rapports entre institutions et développement économique, prolongeant son intérêt pour la gouvernance et les réformes.',
        'Publié alors qu’il avait 87 ans, l’ouvrage aurait mobilisé plus de 200 références étrangères, en complément d’études et de documents de politique publique vietnamiens. Il témoigne d’un apprentissage et d’un travail intellectuel poursuivis jusqu’à la dernière année de sa vie.',
      ]),
      chapter('legacy', 'L’homme dans les souvenirs de ses collègues', 'Souvenirs lors d’un hommage en 2019', 'Intégrité, profondeur intellectuelle et capacité de travail', [
        'Ses collègues se souviennent d’un chercheur qui continuait à apprendre après avoir atteint de hautes fonctions publiques. Les récits de sa vie lui attribuent la maîtrise de quatre langues étrangères : l’anglais, le français, le russe et le chinois.',
        'Lors d’un hommage en 2019, le président de la Fédération, Trần Ngọc Hùng, a rappelé que le Dr Liêm recherchait les librairies pendant ses voyages à l’étranger. Il possédait une vaste bibliothèque personnelle, lisait dans des domaines variés et appréciait même les romans d’arts martiaux.',
        'L’académicien Phạm Hồng Giang a évoqué trois qualités : l’intégrité personnelle, la profondeur intellectuelle et une exceptionnelle capacité de travail. Ces appréciations et souvenirs de collègues éclairent l’homme derrière les fonctions officielles et les publications.',
        'L’article Nghĩ về một người cống hiến, paru en 2019, offre un regard personnel à travers les souvenirs d’un collaborateur de plusieurs décennies. Pour l’ICUE, son héritage durable réunit formation des ingénieurs, service public, recherche indépendante, création d’institutions et apprentissage tout au long de la vie.',
      ]),
    ],
  },
  ko: {
    heading: '삶, 활동과 유산',
    introduction: '대학 교육에서 공공행정, 정책 연구와 전문기관 설립에 이르기까지, ICUE 설립자의 삶과 기여를 여덟 장으로 살펴봅니다.',
    readerHint: '원하는 장을 열거나 계속 버튼으로 차례대로 읽어 보세요.',
    back: '이전', next: '계속', complete: '읽기 마치기', completed: '읽기 완료', counter: '{total}장 중 {current}장',
    source: '전체 약력 자료',
    photoEvents: { '2017': 'VTV1 텔레비전 인터뷰', '2018': '편집 동료들과의 회의' },
    chapters: [
      chapter('life', '생애와 고향', '1931–2018', '베트남 도시 발전과 함께한 삶', [
        'Phạm Sỹ Liêm 박사는 1931년 응에안성 지엔쩌우현 지엔타인에서 태어났습니다. 토목공학자이자 학자, 공공행정가로서 대학 교육, 고위 공직, 과학 연구와 전문기관 설립에 폭넓게 참여했습니다.',
        '그의 활동은 주거, 토지, 공공 인프라, 도시계획과 거버넌스라는 도시생활의 기반에 지속적으로 관심을 기울였습니다. 다양한 직책에서 전문 지식과 제도 개혁이 발전에 어떻게 기여할 수 있는지 탐구했습니다.',
        '2018년 11월 30일 87세로 세상을 떠났으며, 베트남 전통 나이로는 88세였습니다. 공학 교육, 공직, 독립적 정책 연구와 기관 설립을 연결한 그의 유산은 ICUE를 비롯해 그가 남긴 조직들을 통해 이어지고 있습니다.',
      ]),
      chapter('education', '교육과 공학 인재 양성', '1958–1963', '철근콘크리트 공학 교육의 기초를 마련하다', [
        '1950~1960년대에 토목공학을 가르치며 하노이 과학기술대학교의 철근콘크리트 공학 교육 정착에 기여했습니다. 대학 건설학부의 역사 자료에는 1958–1959학년도에 해당 과목을 도입하는 데 참여한 기록이 남아 있습니다.',
        '1959년 10월에는 철근콘크리트 부문 초대 책임자로 임명되었습니다. 교육과 학문 조직을 함께 발전시킨 경력의 초기 이정표였습니다.',
        '1963년 소련에서 대학원 과정을 시작했고, 이후에도 학문 분야의 지도적 역할을 이어갔습니다. 교육과 공학 연구 경험은 훗날 공공행정과 도시정책 활동의 토대가 되었습니다.',
      ]),
      chapter('public-service', '공직과 전문단체 활동', '1982년부터', '공공행정과 전문 공동체의 성장', [
        '공직에서는 건설부 차관과 하노이 인민위원회 부위원장을 역임했습니다. 이러한 역할은 그의 공학적 배경을 건설, 인프라와 도시 발전의 실제 행정 과제에 연결했습니다.',
        '1982년부터 베트남 토목공학협회연합회 초대 회장으로 첫 세 임기를 이끌었고, 이후에는 부회장으로 활동을 이어갔습니다.',
        '그의 기여는 직책에만 머물지 않았습니다. 수십 년에 걸쳐 연합회의 조직 체계와 연구 활동, 전문적 영향력을 발전시키는 데 힘썼습니다. 지속 가능한 전문기관을 세운 일은 동료들이 기억하는 중요한 업적 중 하나였습니다.',
      ]),
      chapter('institutes', '연구기관 설립', '1999 · 2013', '도시 연구와 정책 자문을 위한 두 기관', [
        '1990~2000년대에는 도시 거버넌스, 인프라와 건설정책으로 연구 범위를 넓혔습니다. 1999년 도시연구·인프라개발연구소를 설립해 해당 분야 연구를 위한 조직적 기반을 마련했습니다.',
        '2013년에는 ICUE를 설립하고 초대 원장을 맡았습니다. 연구를 정책 자문과 발전 현장의 과제에 연결하는 기관을 만들려는 활동을 이어간 것입니다.',
        '두 연구기관은 도시계획, 건설경제와 인프라에 대한 오랜 관심을 보여 줍니다. ICUE에 남긴 설립 정신은 공학 지식, 공공행정 경험과 독립적 탐구의 결합에 있습니다.',
      ]),
      chapter('policy', '도시정책과 공론장', '2012–2017', '토지, 계획과 제도에 대한 구체적인 기여', [
        '저서, 연구사업, 학술회의와 인터뷰를 통해 주거, 토지관리, 공공 인프라와 도시 거버넌스를 다뤘습니다. 계획과 정책 집행의 문제점을 공개적으로 비판하며 전문적 토론에도 참여했습니다.',
        '2012년에는 VCCI를 통해 토지법 초안에 대한 상세한 비판 의견을 제출했습니다. 토지 취득, 재산권과 투명성을 다루며 제도적 규칙이 발전과 일상생활에 미치는 영향에 주목했습니다.',
        '2016–2017년에는 계획법 관련 공개 논의에 참여해 국가계획의 조정 강화와 제도 개혁을 주장했습니다. 이러한 활동은 추모 글뿐 아니라 실제 정책 의견 제출 기록으로도 남아 있습니다.',
        '2017년에는 VTV1 텔레비전 인터뷰에 출연했습니다. 아래 자료 사진은 그 인터뷰의 한 장면입니다.',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thị와 편집 활동', '2006–2018', '도시와 삶의 질을 논의하는 공간', [
        '2006년 도시 문제를 다루는 잡지 Người Đô Thị를 공동 창간하고 전문 자문위원회 위원장을 맡았습니다.',
        '잡지는 도시정책과 삶의 질을 논의하는 장이 되었습니다. 연구와 전문단체 활동에 더해, 도시의 전문적 질문을 폭넓은 공적 대화로 이어가는 공간이었습니다.',
        '그는 세상을 떠날 때까지 잡지의 전문 활동에 참여했습니다. 2018년 사진은 편집 동료들과 함께한 회의를 담고 있으며, 기록으로 남은 생애 마지막 시기의 편집 회의 중 하나입니다.',
      ], ['2018']),
      chapter('scholarship', '마지막 해까지 이어진 연구', '2018년 9월', '87세에 출간한 신제도경제학', [
        '2017–2018년에도 고령에도 불구하고 연구와 전문기관 자문을 계속했습니다. 고위 공직을 거친 뒤에도 학문적 호기심을 잃지 않았습니다.',
        '2018년 9월 마지막 주요 학술 저서 Tân kinh tế học thể chế(신제도경제학)를 출간했습니다. 제도와 경제 발전의 관계를 탐구하며 거버넌스와 개혁에 대한 오랜 관심을 이어간 책입니다.',
        '87세에 출간한 이 책은 베트남의 연구·정책 문서와 함께 200편 이상의 해외 자료를 참고한 것으로 전해집니다. 생애 마지막 해까지 지속한 학습과 지적 노동을 보여 줍니다.',
      ]),
      chapter('legacy', '동료들이 기억하는 사람', '2019년 추모행사의 회고', '청렴함, 지적 깊이와 뛰어난 업무 역량', [
        '동료들은 고위 공직에 오른 뒤에도 배움을 이어간 학자로 그를 기억했습니다. 생애를 다룬 글들에는 영어, 프랑스어, 러시아어와 중국어의 네 외국어를 구사했다는 내용이 전해집니다.',
        '2019년 추모행사에서 연합회 회장 Trần Ngọc Hùng은 해외에 나갈 때면 서점을 찾던 그의 모습을 회고했습니다. 그는 방대한 개인 서재를 갖추고 여러 분야의 책을 읽었으며, 무협소설도 즐겼습니다.',
        '학술원 회원 Phạm Hồng Giang은 그의 유산을 개인적 청렴함, 지적 깊이와 탁월한 업무 역량이라는 세 가지 특성으로 설명했습니다. 이는 동료들의 평가와 기억으로, 직책과 저서 뒤에 있는 인간적 면모를 보여 줍니다.',
        '2019년 글 Nghĩ về một người cống hiến는 수십 년간 함께 일한 사람의 회고를 통해 더욱 가까운 이야기를 전합니다. ICUE에 남은 그의 유산은 공학 교육, 공직, 독립적 연구, 기관 설립과 평생의 학문 활동을 함께 아우릅니다.',
      ]),
    ],
  },
  ja: {
    heading: '生涯、活動と遺産',
    introduction: '大学教育から行政、政策研究、専門機関の設立まで。ICUE創設者の生涯と貢献を、八つの章でたどります。',
    readerHint: '各章を開くか、「次へ」で順番にお読みいただけます。',
    back: '戻る', next: '次へ', complete: '読み終える', completed: '読了', counter: '全{total}章中 第{current}章',
    source: '詳しい経歴資料',
    photoEvents: { '2017': 'VTV1のテレビインタビュー', '2018': '編集の同僚たちとの会議' },
    chapters: [
      chapter('life', '生涯と故郷', '1931–2018', 'ベトナムの都市発展と歩んだ生涯', [
        'Phạm Sỹ Liêm博士は1931年、ゲアン省ディエンチャウ県ディエンタインに生まれました。土木技術者、学者、行政官として、大学教育、政府の要職、科学研究、専門機関の設立に携わりました。',
        '住宅、土地、公共インフラ、計画、都市ガバナンスは、その活動を通じて繰り返し取り上げたテーマでした。異なる立場から、専門知識と制度改革が発展にどう貢献できるかを探究しました。',
        '2018年11月30日に87歳で逝去しました。ベトナムの伝統的な数え年では88歳です。工学教育、公務、独立した政策研究、組織づくりを結ぶ遺産は、ICUEをはじめ、彼が残した機関を通じて受け継がれています。',
      ]),
      chapter('education', '教育と技術者の育成', '1958–1963', '鉄筋コンクリート工学教育の基礎を築く', [
        '1950～1960年代に土木工学を教え、ハノイ工科大学の鉄筋コンクリート工学教育の確立に貢献しました。同大学建設学部の歴史資料には、1958–1959年度にこの科目を導入する際の役割が記録されています。',
        '1959年10月、鉄筋コンクリート部門の初代責任者に任命されました。教育と学術組織の発展に携わった経歴における、初期の重要な節目でした。',
        '1963年にソ連で大学院課程を開始し、その後も学術分野の指導的役割を続けました。教育と工学研究の経験は、後の行政や都市政策への取り組みを支える基盤となりました。',
      ]),
      chapter('public-service', '公務と専門団体', '1982年から', '政府の責務と専門家コミュニティの形成', [
        '公務では建設副大臣、ハノイ市人民委員会副委員長を歴任しました。これらの役割を通じ、工学の専門性を建設、インフラ、都市発展の実務的な行政課題に結び付けました。',
        '1982年からベトナム土木工学協会連合の創設会長として最初の三期を率い、その後も副会長として活動を続けました。',
        '貢献は役職だけにとどまりません。数十年にわたり、連合の組織構造、研究活動、専門分野での影響力の発展を支えました。長く活動する専門機関を築いたことは、同僚たちが記憶する重要な功績の一つです。',
      ]),
      chapter('institutes', '研究機関の設立', '1999 · 2013', '都市研究と政策助言のための二つの機関', [
        '1990～2000年代には、都市ガバナンス、インフラ、建設政策へ研究を広げました。1999年に都市研究・インフラ開発研究所を設立し、これらの分野に組織的な基盤をつくりました。',
        '2013年にはICUEを設立し、初代所長に就任しました。研究を政策助言と実際の発展課題へつなぐ機関を築くという活動の継続でした。',
        '二つの研究所は、都市計画、建設経済、インフラへの長年の関心を表しています。ICUEにおける創設者の遺産は、工学の知識、行政経験、独立した探究を結び付けた姿勢にあります。',
      ]),
      chapter('policy', '都市政策と公開討論', '2012–2017', '土地、計画、制度に関する具体的な貢献', [
        '著書、研究事業、会議、インタビューを通じて、住宅、土地管理、公共インフラ、都市ガバナンスを検討しました。計画や政策実施の問題点を公に批判し、専門家としての議論にも参加しました。',
        '2012年にはVCCIを通じ、土地法草案に対する詳しい批判的意見を提出しました。土地取得、財産権、透明性を扱い、制度上の規則が発展と日常生活に与える影響に関心を向けました。',
        '2016–2017年には計画法をめぐる公開討論に参加し、国家計画の連携強化と制度改革を主張しました。これらの貢献は、追悼文だけでなく政策への意見提出記録にも残っています。',
        '2017年にはVTV1のテレビインタビューに出演しました。以下の資料写真は、そのインタビューの一場面です。',
      ], ['2017']),
      chapter('editorial', 'Người Đô Thịと編集活動', '2006–2018', '都市と生活の質について議論する場', [
        '2006年に都市問題を扱う雑誌Người Đô Thịを共同創刊し、専門諮問委員会の委員長を務めました。',
        '同誌は都市政策と生活の質を議論する場となりました。研究や専門団体の活動に加え、都市に関する専門的な問いを、より広い公共の対話へつなげる役割を担いました。',
        '逝去するまで同誌の専門活動に携わり続けました。2018年の写真は編集の同僚たちとの会議を記録したもので、記録に残る最晩年の編集会議の一つです。',
      ], ['2018']),
      chapter('scholarship', '最後の年まで続けた研究', '2018年9月', '87歳で刊行した『新制度派経済学』', [
        '2017–2018年も、高齢にもかかわらず研究と専門機関への助言を続けました。政府の要職を経験した後も、学問への好奇心は衰えませんでした。',
        '2018年9月、最後の主要な学術著作Tân kinh tế học thể chế（新制度派経済学）を刊行しました。制度と経済発展の関係を探究し、ガバナンスと改革への長年の関心を引き継いだ著作です。',
        '著者が87歳のときに出版された同書は、ベトナムの研究・政策文書とともに、200件を超える海外資料を参照したと伝えられています。生涯最後の年まで続けた学習と知的労働を物語っています。',
      ]),
      chapter('legacy', '同僚たちが記憶する人柄', '2019年の追悼行事での回想', '誠実さ、知的な深さ、並外れた仕事への力', [
        '同僚たちは、高い公職に就いてからも学び続けた学者として彼を記憶しています。生涯を扱った記録では、英語、フランス語、ロシア語、中国語の四つの外国語を使ったと伝えられています。',
        '2019年の追悼行事で、連合会長Trần Ngọc Hùngは、海外に行くと書店を探していた博士の姿を回想しました。豊富な個人蔵書を持ち、幅広く読書をし、武侠小説も楽しんでいました。',
        '学術院会員Phạm Hồng Giangは、個人としての誠実さ、知的な深さ、並外れた仕事への力という三つの資質から彼の遺産を語りました。これらは同僚の評価と回想であり、役職や著作の背後にある人柄を伝えています。',
        '2019年の記事Nghĩ về một người cống hiếnには、数十年間ともに働いた人の回想による身近な姿が記されています。ICUEにとって、工学教育、公務、独立した研究、機関設立、生涯の学問を結ぶ姿勢こそ、創設者の永続的な遺産です。',
      ]),
    ],
  },
}

export default founderBiography
