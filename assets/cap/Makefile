SVGS = $(patsubst %.tex,%.svg,$(wildcard cap*.tex))

all: $(SVGS)

%.svg: %.tex preamble.tex
	pdflatex -interaction=nonstopmode -shell-escape $<

purge: clean
	-rm *.svg
	-rm cap*.tex

clean:
	-rm *.aux
	-rm *.log
	-rm *.pdf
