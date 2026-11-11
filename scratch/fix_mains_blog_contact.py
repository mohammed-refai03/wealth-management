with open('blog.html', 'r', encoding='utf-8') as f:
    blog_text = f.read()

blog_text = blog_text.replace('<main>0M', '$10M')
blog_text = blog_text.replace('<main>,000,000', '$1,000,000')
blog_text = blog_text.replace('<main>3.6M+', '$13.6M+')

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_text)

print("blog.html <main> count:", blog_text.count('<main'), blog_text.count('</main>'))

with open('contact.html', 'r', encoding='utf-8') as f:
    contact_text = f.read()

contact_text = contact_text.replace('<main>,000,000', '$1,000,000')
contact_text = contact_text.replace('<main>5,000,000', '$15,000,000')

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(contact_text)

print("contact.html <main> count:", contact_text.count('<main'), contact_text.count('</main>'))
